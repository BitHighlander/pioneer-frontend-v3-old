import { Center } from "@chakra-ui/react";
import { CircularProgress } from "lib/components/CircularProgress";
import type { HTMLMotionProps } from "framer-motion";
import { Text } from "lib/components/Text";
import type { ReactNode } from "react";

import { PageTransition } from "./PageTransition";

type PageProps = {
  children: ReactNode;
  loading?: boolean;
  error?: boolean;
  renderError(): JSX.Element;
  renderLoading(): JSX.Element;
} & HTMLMotionProps<"div">;

export const Page = ({
  children,
  loading,
  error,
  renderLoading,
  renderError,
  ...rest
}: PageProps) => (
  <PageTransition {...rest} style={{ width: "100%" }}>
    {error && !loading ? renderError() : loading ? renderLoading() : children}
  </PageTransition>
);

Page.defaultProps = {
  renderLoading: () => (
    <Center width="full" height="100%">
      <CircularProgress isIndeterminate />
    </Center>
  ),
  renderError: () => (
    <Center width="full" height="100%">
      <Text translation="common.noResultsFound" />
    </Center>
  ),
};
