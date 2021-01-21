declare interface Configuration {
  [propName: string]: any;
}

declare module 'webpack-dev-server' {
  const server: any;
  export { Configuration };
  export default server;
}
