export type Track = {
  attach: TrackFunction;
  detach: TrackFunction;
}

type TrackFunction = (prop: any) => void;