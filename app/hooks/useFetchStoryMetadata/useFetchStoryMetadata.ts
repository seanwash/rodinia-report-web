import { ChangeEvent, useEffect, useState } from "react";

const useFetchStoryMetadata = () => {
  const [sourceUrl, setSourceUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState();

  const handleSourceUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSourceUrl(event.target.value);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  useEffect(() => {
    const fetchStoryMetaData = async () => {
      if (sourceUrl === undefined || sourceUrl === "") return;

      setIsLoading(true);
      setIsError(false);
      setError(undefined);

      try {
        const request = await fetch("/api/stories/metadata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: sourceUrl }),
        });

        const { ogTitle } = await request.json();

        setTitle(ogTitle);
      } catch (requestError) {
        setIsError(true);
        setError(requestError);
      }

      setIsLoading(false);
    };

    fetchStoryMetaData();
  }, [sourceUrl]);

  return {
    sourceUrl,
    title,
    isLoading,
    isError,
    error,
    handleSourceUrlChange,
    handleTitleChange,
  };
};

export default useFetchStoryMetadata;
