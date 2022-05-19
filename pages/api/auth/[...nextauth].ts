import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { User } from '../../../lib/types/Users';
import { login, get_profile, get_video_token } from '../../../lib/auth/auth'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'some@some.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        try{
          await login(credentials!!.username,credentials!!.password)
          const resp = await get_profile(credentials!!.username);
          let videoToken : string | null = null;
          if (resp.data.session && resp.data.session.videoSession) {
            const tokenResponse = await get_video_token(credentials!!.username, resp.data.session.videoSession.roomId)
            if (tokenResponse.data && tokenResponse.data.token) {
              videoToken = tokenResponse.data.token;
            }
          }
          const user : User = { 'username': credentials!!.username, 'name': resp.data.name, 'lastname': resp.data.lastname, 'status': resp.data.status, 'type': resp.data.type, 'session': resp.data.session, 'videoToken': `${videoToken}` };
          if(!user)
            throw new Error("Invalid user or password"); // Redirect to error page
          return { name: user.name, email: user.lastname, image: user };
        }catch(err){
          throw new Error("Invalid user or password"); // Redirect to error page
        }     
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
  },
});