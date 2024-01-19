import moment from "moment";

const ConvertTime = (data_input: string) => {
  return moment(data_input).format("llll");
};

export { ConvertTime };
