import { useRouter } from "next/router";
import Layout from "../components/Layout";
import "../styles/globals.css";
import { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import ErrorBoundary from "../components/ErrorBoundary";

export function reportWebVitals(metric) {
  console.log(metric);
}

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [visitedTime] = useState(new Date());

  return (
    <Layout home={router.pathname === "/"}>
      <div>
        visited:{" "}
        {formatDistanceToNow(new Date(visitedTime), {
          addSuffix: true,
          includeSeconds: true,
        })}
      </div>
      <ErrorBoundary fallbackComponent={<div>하하하 민망하네요</div>}>
        <Component {...pageProps} />
      </ErrorBoundary>
    </Layout>
  );
}
