class SocketInterceptor {
  private socket: SocketIO.Socket;

  constructor(socket: SocketIO.Socket) {
    this.socket = socket;
  }

  public intercept() {
    this.socket.on("message", (data) => {
      console.log("Message received: ", data);
    });
  }
}

export default SocketInterceptor;
