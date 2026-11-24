import { handleEdgeRequest } from "./lib/router.js";

export async function onRequest(context) {
  return handleEdgeRequest(context);
}

export default onRequest;
