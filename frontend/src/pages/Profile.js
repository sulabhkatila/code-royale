import { useParams } from "react-router-dom";
import FriendRequestButton from "../components/Profile/FriendRequestButton";
import Profileinfo from "../components/Profile/Profileinfo";
import Profilepic from "../components/Profile/Profilepic";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGet } from "../hooks/useGet";

export default function Profile() {
  const { username } = useParams();
  const { user } = useAuthContext();

  // fetch the user whose profile is being looked from the backend
  // while fetching the user, also send information on which user is making the request
  const { data, loading, error } = useGet(`/api/user/${username}`, false);

  const {
    data: userwithfriends,
    loading: ufloading,
    error: uferror,
  } = useGet(`/api/user/friendsandrequests/${username}`, true);

  return (
    <div className="w-screen h-screen text-white bg-dark-1">
      <div className="flex flex-col items-center justify-between w-full h-full">
        <Profilepic />
        <div className="w-full h-full overflow-auto">
          {data ? <Profileinfo profileUser={data} /> : <>loading ...</>}
        </div>
        <div>
          {user ? (
            user.username === username ? (
              <button> Edit Profile </button>
            ) : (
              <FriendRequestButton user={user} profileUser={data} task={0} />
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}
