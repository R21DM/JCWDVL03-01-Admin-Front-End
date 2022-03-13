// Untuk mendapatkan message error sesuai case

export const parseRes = (error) => {
  if (error.response) {
    // Request made and server responded
    return error.response.data;
  } else if (error instanceof Error) {
    // Something happened in setting up the request that triggered an Error (Javascript Error)
    return error.message;
  } else if (error.request) {
    // The request was made but no response was received ex. Network Error
    return error.request.statusText;
  }

  return `${error}`;
};
