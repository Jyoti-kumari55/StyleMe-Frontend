import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, fetchUser } from "../features/userSlice";

const UserView = ({ onSelectUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.user.users);
  // console.log("all users: ", users);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const deleteUserHandler = (e, userId) => {
    e.stopPropagation();
    dispatch(deleteUser(userId));
  };

  const editUserDataHandler = (user) => {
    navigate("/userForm", { state: { user } });
  };

  const selectUserHandler = (userId) => {
    setSelectedUserId(userId === selectedUserId ? null : userId);
    const selectedUser = users.find((user) => user._id === userId);
    onSelectUser(selectedUser);
  };
  return (
    <>
      <div className="container">
        {status === "loading" && <p>Loading users...</p>}
        {error && <p>An error occurred while fetching the users :- {error}</p>}
        <div className="row mb-4">
          <ol class="list-group list-group-numbered align-items-center">
            {users && users.length > 0 ? (
              users.map((user) => (
                <li
                  key={user._id}
                  className={`list-group-item w-75
                           ${
                             selectedUserId === user._id
                               ? "bg-info-subtle"
                               : " "
                           }`}
                  onClick={() => selectUserHandler(user._id)}
                >
                  <span className="ms-4"> {user.name} </span>

                  <span className="d-flex ms-auto float-end">
                    <button
                      className="btn btn-warning btn-sm rounded me-3 "
                      onClick={() => editUserDataHandler(user)}
                      style={{ flex: "1 0 auto", marginBottom: "10px" }}
                    >
                      Edit Details
                    </button>
                    <button
                      className="btn btn-danger btn-sm rounded "
                      onClick={(e) => deleteUserHandler(e, user._id)}
                      style={{ flex: "1 0 auto", marginBottom: "10px" }}
                    >
                      Delete
                    </button>
                  </span>
                </li>
              ))
            ) : (
              <p>No User Found.. </p>
            )}
            <Link to="/userForm">
              <button className="my-2 btn btn-success w-100">
                Create New User
              </button>
            </Link>
          </ol>

          {/* {users && users.length > 0 ? (
            <ol className=" list-group list-group-numbered">
              {users.map((user) => (
                <li
                  key={user._id}
                  className={`list-group-item
                       ${selectedUserId === user._id ? "bg-info-subtle" : " "}`}
                  onClick={() => selectUserHandler(user._id)}
                >
                  <div>
                    <span> {user.name} </span>
                    <span className="">
                      <button
                        className="btn btn-warning btn-sm rounded me-3 "
                        onClick={() => editUserDataHandler(user)}
                        style={{ flex: "1 0 auto", marginBottom: "10px" }}
                      >
                        Edit Details
                      </button>
                      <button
                        className="btn btn-danger btn-sm rounded "
                        onClick={() => deleteUserHandler(user._id)}
                        style={{ flex: "1 0 auto", marginBottom: "10px" }}
                      >
                        Delete
                      </button>
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p>No User Found.. </p>
          )}
          <Link to="/userForm">
            <button className="my-2 btn btn-success w-100">
              Create New User
            </button>
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default UserView;
