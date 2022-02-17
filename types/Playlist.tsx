import { AnyAction, EmptyObject, Store } from "redux";

interface Data {
  collaborative: boolean,
  description: string,
  external_urls: {
    spotify: string
  },
  href: string,
  id: string,
  images: [
    {
      height: string,
      url: string,
      width: string
    }
  ],
  name: string,
  owner: {
    display_name: string,
    external_urls: { spotify: string },
    href: string,
    id: string,
    type: string,
    uri: string
  },
  primary_color: string,
  public: string,
  snapshot_id: string,
  tracks: {
    href: string,
    total: number
  },
  type: string,
  uri: string
}

interface List {
  message: string,
  playlists: {
    href: string,
    items: Data[],
    limit: number,
    next: string,
    offset: number,
    previous: string,
    total: number
  }
}

interface StateProps {
  [x: string]: Data[]
}

interface StoreType extends Store<EmptyObject & { playlist: StateProps; }, AnyAction> {
  __PERSISTOR: any;
}

interface PlayListsProps {
  label: string,
  list: Data[],
}

interface PlayListItemProps {
  item: Data,
}

export type { Data, List, StateProps, StoreType, PlayListsProps, PlayListItemProps }