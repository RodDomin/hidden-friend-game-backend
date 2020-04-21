interface Params {
  min: number;
  max: number;
}

export default (data: Params) => Math.floor(
  Math.random() * (data.max - data.min),
) + data.min;
