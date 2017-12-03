import { category as request } from "./request";
import { category as action } from "./state/actions";

/** loads categories from server and returns as action */
export async function load(): void {
  const response = await request.load();
  const result = action.load(response);
  return result;
}
