import zod from "zod";

zod.setErrorMap((issue, ctx) => {
  switch (issue.code) {
    case "too_small":
      return {
        message: `The value is too small. The minimum value is ${issue.minimum}.`,
      };
  }
  return {
    message: ctx.defaultError,
  };
});

export default zod;
