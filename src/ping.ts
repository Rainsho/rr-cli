import { Socket } from 'net';

export interface PingArgv {
  hosts: string[];
  ports: number[];
  timeout: number;
}

function tryConnect(host: string, port: number, timeout: number): PromiseLike<string> {
  return new Promise(res => {
    const sock = new Socket();
    const timer = Date.now();

    sock.setTimeout(timeout);

    sock.on('connect', () => {
      res(`${host}:${port} is up and responsed in ${Date.now() - timer} ms.`);
      sock.destroy();
    });

    sock.on('error', e => {
      res(`${host}:${port} is down, cased by: ${e.message}`);
      sock.destroy();
    });

    sock.on('timeout', () => {
      res(`${host}:${port} had not responsed in ${timeout} ms.`);
      sock.destroy();
    });

    sock.connect(port, host);
  });
}

export default async function ping(argv: PingArgv) {
  const tasks = [];
  const { hosts, ports, timeout } = argv;

  for (const host of hosts) {
    for (const port of ports) {
      tasks.push({ host, port });
    }
  }

  const descs: string[] = await Promise.all(
    tasks.map(({ host, port }) => tryConnect(host, port, timeout))
  );

  console.log(descs.join('\n'));
}
