const prod = {
  url: {
    API_URL: "https://midicine-server.herokuapp.com"
  },
};
const dev = {
  url: {
    API_URL: "http://localhost:5000",
  },
};


dev['BASE_URL'] = 'api/v1';

prod['BASE_URL'] = 'api/v1';

export const config = process.env.NODE_ENV === "development" ? dev : prod;
