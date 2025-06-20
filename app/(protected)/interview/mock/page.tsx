import Agent from "@/components/agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center w-full h-full p-4">
        <h3 className="text-3xl mb-4">Interview generation</h3>

        <Agent
          userName={user?.name!}
          userId={user?.id}
          profileImage={user?.profileURL}
          type="generate"
        />
      </div>
    </>
  );
};

export default Page;
