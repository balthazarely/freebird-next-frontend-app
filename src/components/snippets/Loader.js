import { Oval } from "react-loader-spinner";

export default function Loader() {
  return (
    <Oval
      height={60}
      width={60}
      color="white"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="black "
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
}
