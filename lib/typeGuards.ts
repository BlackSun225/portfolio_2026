import { ActionResponse } from "./types";

export function hasError(response: ActionResponse): response is { success: false; error: string } {
  return !response.success && 'error' in response;
}

export function hasErrors(response: ActionResponse): response is { success: false; errors: Array<{ field: string; message: string }> } {
  return !response.success && 'errors' in response;
}