import fetch from "isomorphic-fetch";
global.requestAnimationFrame = callback => setTimeout(callback, 0);
