type BackDrop = {
  cart: boolean,
  account: boolean
}

declare var module: NodeModule;
declare var stripe: any;
declare var elements: any;

interface NodeModule {
  id: string;
}
