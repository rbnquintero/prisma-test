import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";
import { User } from '../lib/types/Users';

const prisma = new PrismaClient();

const handler: Handler = async (event, context) => {    
  if (event.body) {    
    const username = JSON.parse(event.body).username
    // Search on SPXSession for guest
    const guestSessionsFound = await prisma.sPXSession.findMany({
      where: {
        guestId: {
          equals: username
        },
        AND: [
          {
            status: {
              in: ['active', 'reserved']
            }
          }
        ]
      },
      orderBy: {
        start: 'desc'
      },
      include: {
        guest: true,
        host: true,
        cart: true,
        wishList: true,
        viewedProducts: true,
        videoSession: true
      }
    })
    if (guestSessionsFound.length > 0) {
      const session = guestSessionsFound[0]
      const guest = session.guest
      console.log('sPXUserGuest:'+JSON.stringify(session))
      const user : User = { 'username': guest.username, 'name': guest.name, 'lastname': guest.lastname, 'status': guest.status, 'type': 'guest', 'session': session };    
      return {
        statusCode: 200,
        body: JSON.stringify(user),
      };
    }
    // Search on SPXSession for host
    const hostSessionsFound = await prisma.sPXSession.findMany({
      where: {
        hostId: {
          equals: username
        },
        AND: [
          {
            status: {
              in: ['active', 'reserved']
            }
          }
        ]
      },
      orderBy: {
        start: 'desc'
      },
      include: {
        guest: true,
        host: true,
        cart: true,
        wishList: true,
        viewedProducts: true,
        videoSession: true
      }
    })
    if (hostSessionsFound.length > 0) {
      const session = hostSessionsFound[0]
      const host = session.host
      console.log('sPXUserHost:'+JSON.stringify(session))
      const user : User = { 'username': host.username, 'name': host.name, 'lastname': host.lastname, 'status': host.status, 'type': 'host', 'session': session };    
      return {
        statusCode: 200,
        body: JSON.stringify(user),
      };
    }

    // Search on SPXGuest
    const sPXUserGuest = await prisma.sPXGuest.findUnique({
      where: {
        username: username
      }
    })
    if(sPXUserGuest){
      console.log('sPXUserGuest:'+JSON.stringify(sPXUserGuest))
      const user : User = { 'username': sPXUserGuest.username, 'name': sPXUserGuest.name, 'lastname': sPXUserGuest.lastname, 'status': sPXUserGuest.status, 'type': 'guest' };    
      return {
        statusCode: 200,
        body: JSON.stringify(user),
      };
    }
    // Search on SPXHost
    const sPXUserHost = await prisma.sPXHost.findUnique({
      where: {
        username: username
      }
    })
    if(sPXUserHost){
      console.log('sPXUserHost:'+JSON.stringify(sPXUserHost))
      const user : User = { 'username': sPXUserHost.username, 'name': sPXUserHost.name, 'lastname': sPXUserHost.lastname, 'status': sPXUserHost.status, 'type': 'host' };    
      return {
        statusCode: 200,
        body: JSON.stringify(user),
      };
    }    
  }
  return {
    statusCode: 409,
    body: JSON.stringify({'error': 'Invalid username.'}),
  }
};

export { handler };
