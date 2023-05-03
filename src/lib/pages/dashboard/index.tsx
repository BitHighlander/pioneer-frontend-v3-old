import { Grid } from "@chakra-ui/react";
import { useEffect } from "react";

const Dashboard = () => {
  const onStart = async function () {
    try {
      // eslint-disable-next-line no-console
      console.log("onStart())");
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  // onstart get data
  useEffect(() => {
    onStart();
  }, []);

  return <Grid gap={4}>dashboard</Grid>;
};

export default Dashboard;
