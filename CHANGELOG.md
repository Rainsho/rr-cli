## 0.0.2

- add: `rr ping` to ping one or more hosts and ports

  ```bash
  # ping a host's HTTP(80) port
  rr ping baidu.com
  # ping a batch hosts and ports
  rr ping -p 80,443,8080 baidu.com google.com
  ```

## 0.0.1

- project init
- add: `rr rn` rename a TV series in IMDB format

  ```bash
  # e.g.
  # 权力的游戏.Game.of.Thrones.S07E01.中英字幕.BDrip.720p-xx影视.mp4 -> Game of Thrones S07E01.mp4
  rr rn -p "Game.of.Thrones"
  ```
