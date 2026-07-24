import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

import {
  getUsers,
  deleteUser,
} from "../services/userService";

import { toast } from "react-toastify";


function Users() {


  const [users,setUsers] = useState([]);

  const fetchUsers = async()=>{

    try{

      const res = await getUsers();

      setUsers(res.data || []);

    }catch(error){

      console.log(error);

      toast.error(
        "Failed loading users"
      );

    }

  };



  useEffect(()=>{

    fetchUsers();

  },[]);




  const handleDelete = async(id)=>{


    const confirm =
    window.confirm(
      "Delete this user?"
    );


    if(!confirm)
    return;


    try{


      await deleteUser(id);


      toast.success(
        "User deleted successfully"
      );


      fetchUsers();


    }catch(error){

      console.log(error);

      toast.error(
        "Failed deleting user"
      );

    }

  };




  return (

    <AppLayout>


      <PageHeader

        title="User Management"

        subtitle="Manage system users and roles"

      />



      <div className="flex justify-end mb-6">


        <Link

          to="/add-user"

          className="
          bg-black 
          text-white 
          px-5 
          py-3 
          rounded-xl
          "

        >

          + Create User

        </Link>


      </div>





      <Card className="overflow-x-auto">


        <table className="w-full">


          <thead className="bg-slate-900 text-white">


            <tr>

              <th className="p-4 text-left">
                Name
              </th>


              <th className="p-4 text-left">
                Email
              </th>


              <th className="p-4 text-left">
                Role
              </th>


              <th className="p-4 text-left">
                Actions
              </th>


            </tr>


          </thead>




          <tbody>


          {
          users.map((user)=>(


            <tr

            key={user._id}

            className="border-b hover:bg-gray-50"

            >


              <td className="p-4">

                {user.name}

              </td>



              <td className="p-4">

                {user.email}

              </td>



              <td className="p-4">


                <span
                className="
                bg-blue-100
                text-blue-700
                px-3
                py-1
                rounded-full
                "
                >

                  {user.role}

                </span>


              </td>




              <td className="p-4 flex gap-3">


                <Link

                to={`/edit-user/${user._id}`}

                className="
                bg-green-600
                text-white
                px-3
                py-1
                rounded
                "

                >

                  Edit

                </Link>



                <button

                onClick={()=>
                  handleDelete(user._id)
                }

                className="
                bg-red-600
                text-white
                px-3
                py-1
                rounded
                "

                >

                  Delete

                </button>



              </td>


            </tr>


          ))

          }


          </tbody>


        </table>



        {
        users.length===0 &&

        <div className="p-8 text-center">

          No users found.

        </div>

        }



      </Card>



    </AppLayout>

  );

}


export default Users;