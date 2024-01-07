import { useQueries } from "@/hooks/useQueries";
import Layout from "@/layout";
import { Avatar, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import Cookies from "js-cookie";
import Link from "next/link";

const calculateTimeAgo = (timestamp) => {
  const now = new Date();
  const createdAt = new Date(timestamp);
  const timeDifference = now - createdAt;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
};

export default function Notification() {
  const { data: notifs, isLoading } = useQueries({
    prefixUrl: "/api/notification",
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

  return (
    <Layout metaTitle="Notification">
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap={4}
        p={4}
      >
        <Flex
          className="w-full lg:w-1/2 border border-solid border-x-0 border-t-0 border-purple-500 pb-2"
          justifyContent="center"
        >
          <Heading fontSize="lg">Notification</Heading>
        </Flex>
        {isLoading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="brand.purple"
            size="xl"
          />
        ) : (
          notifs?.data?.map((notif) => (
            <Link key={notif.id} href={`/replies/${notif?.posts?.id}`} className="w-full lg:w-1/2 border border-solid border-x-0 border-t-0 border-neutral-300 pb-2">
                <Flex
                gap={4}
                justifyContent="flex-start"
                alignItems="center"
                >
                <Avatar name={notif?.user?.name} />
                <Flex direction="column">
                    <Text fontSize="md" fontWeight={700}>
                    {notif?.user?.name}
                    </Text>
                    <Text fontSize="sm" fontStyle="italic">
                    {`${notif?.remark} your post • ${calculateTimeAgo(
                        notif?.created_at
                    )}`}
                    </Text>
                </Flex>
                </Flex>
            </Link>
          ))
        )}
        {(!isLoading && notifs?.data?.length === 0) && (
          <Text>No notifications available</Text>
        )}
      </Flex>
    </Layout>
  );
}
