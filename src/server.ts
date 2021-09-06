import { serverHttp } from "./http";

serverHttp.listen(3333, () => console.log("server started on port 3333"));
