import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Save,
  Upload,
  User,
  Briefcase,
  MapPin,
  GraduationCap,
  Heart,
  Globe,
} from "lucide-react";

import { EmployeeContext } from "../context/EmployeeContext";

import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";


function EditEmployee() {

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    employees,
    updateEmployee
  } = useContext(EmployeeContext);


  const employee = employees.find(
    (emp) => emp._id === id
  );


  const [image,setImage] = useState(null);

  const [preview,setPreview] = useState("");



  const [formData,setFormData] = useState({

    employeeId:"",
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    gender:"Male",

    dateOfBirth:"",
    nationality:"",
    maritalStatus:"",

    address:"",
    city:"",
    state:"",
    country:"",

    department:"IT",
    jobTitle:"",
    employmentType:"Full Time",
    manager:"",
    officeLocation:"",
    hireDate:"",
    salary:"",

    education:"",
    skills:"",
    bio:"",

    emergencyName:"",
    emergencyRelationship:"",
    emergencyPhone:"",

    linkedin:"",
    github:"",
    website:"",

    status:"Active"

  });



  useEffect(()=>{

    if(employee){

      setFormData({

        employeeId: employee.employeeId || "",

        firstName: employee.firstName || "",

        lastName: employee.lastName || "",

        email: employee.email || "",

        phone: employee.phone || "",

        gender: employee.gender || "Male",


        dateOfBirth: employee.dateOfBirth
        ? employee.dateOfBirth.substring(0,10)
        : "",


        nationality: employee.nationality || "",

        maritalStatus: employee.maritalStatus || "",


        address: employee.address || "",

        city: employee.city || "",

        state: employee.state || "",

        country: employee.country || "",


        department: employee.department || "IT",

        jobTitle: employee.jobTitle || "",

        employmentType:
        employee.employmentType || "Full Time",

        manager: employee.manager || "",

        officeLocation:
        employee.officeLocation || "",


        hireDate: employee.hireDate
        ? employee.hireDate.substring(0,10)
        : "",


        salary: employee.salary || "",


        education: employee.education || "",

        skills: employee.skills || "",

        bio: employee.bio || "",


        emergencyName:
        employee.emergencyName || "",


        emergencyRelationship:
        employee.emergencyRelationship || "",


        emergencyPhone:
        employee.emergencyPhone || "",


        linkedin:
        employee.linkedin || "",


        github:
        employee.github || "",


        website:
        employee.website || "",


        status:
        employee.status || "Active"

      });


      setPreview(employee.image || "");

    }


  },[employee]);



  const handleChange=(e)=>{

    setFormData(prev=>({

      ...prev,

      [e.target.name]:
      e.target.value

    }));

  };



  const handleImage=(e)=>{

    const file=e.target.files[0];

    if(!file) return;


    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );

  };



  const handleSubmit=async(e)=>{

    e.preventDefault();


    try{


      const data=new FormData();


      Object.keys(formData).forEach(key=>{

        data.append(
          key,
          formData[key]
        );

      });


      data.append(
        "name",
        `${formData.firstName} ${formData.lastName}`
      );


      if(image){

        data.append(
          "image",
          image
        );

      }


      await updateEmployee(
        data,
        id
      );


      navigate(
        `/employee/${id}`
      );


    }catch(error){

      console.error(error);

      alert(
        "Unable to update employee"
      );

    }


  };  return (

    <AppLayout>


      <PageHeader

        title="Edit Employee"

        subtitle="Update employee information."

      />


      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >



        {/* PERSONAL INFORMATION */}

        <Card className="p-8">


          <div className="flex items-center gap-3 mb-8">

            <User className="text-blue-600"/>

            <h2 className="text-2xl font-bold">
              Personal Information
            </h2>

          </div>



          <div className="grid lg:grid-cols-4 gap-8">



            {/* IMAGE */}

            <div className="flex flex-col items-center">


              <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-dashed flex items-center justify-center bg-slate-50">


                {
                  preview ?

                  <img

                    src={preview}

                    alt="Employee"

                    className="w-full h-full object-cover"

                  />

                  :

                  <Upload
                    size={45}
                    className="text-slate-400"
                  />

                }


              </div>



              <label className="mt-6">


                <span className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-xl">

                  Change Photo

                </span>



                <input

                  type="file"

                  accept="image/*"

                  hidden

                  onChange={handleImage}

                />


              </label>


            </div>





            {/* FORM */}

            <div className="lg:col-span-3">


              <div className="grid md:grid-cols-2 gap-6">



                <div>

                  <label className="block mb-2 font-medium">

                    Employee ID

                  </label>


                  <input

                    name="employeeId"

                    value={formData.employeeId}

                    onChange={handleChange}

                    className="w-full border rounded-xl px-4 py-3"

                  />

                </div>





                <div>

                  <label className="block mb-2 font-medium">

                    Gender

                  </label>


                  <select

                    name="gender"

                    value={formData.gender}

                    onChange={handleChange}

                    className="w-full border rounded-xl px-4 py-3"

                  >

                    <option>Male</option>

                    <option>Female</option>

                    <option>Other</option>


                  </select>

                </div>





                <div>

                  <label className="block mb-2 font-medium">

                    First Name

                  </label>


                  <input

                    name="firstName"

                    value={formData.firstName}

                    onChange={handleChange}

                    className="w-full border rounded-xl px-4 py-3"

                  />

                </div>





                <div>

                  <label className="block mb-2 font-medium">

                    Last Name

                  </label>


                  <input

                    name="lastName"

                    value={formData.lastName}

                    onChange={handleChange}

                    className="w-full border rounded-xl px-4 py-3"

                  />

                </div>





                <div>

                  <label className="block mb-2 font-medium">

                    Email

                  </label>


                  <input

                    type="email"

                    name="email"

                    value={formData.email}

                    onChange={handleChange}

                    className="w-full border rounded-xl px-4 py-3"

                  />

                </div>





                <div>

                  <label className="block mb-2 font-medium">

                    Phone

                  </label>


                  <input

                    name="phone"

                    value={formData.phone}

                    onChange={handleChange}

                    className="w-full border rounded-xl px-4 py-3"

                  />

                </div>





                <div>

                  <label className="block mb-2 font-medium">

                    Date Of Birth

                  </label>


                  <input

                    type="date"

                    name="dateOfBirth"

                    value={formData.dateOfBirth}

                    onChange={handleChange}

                    className="w-full border rounded-xl px-4 py-3"

                  />

                </div>





                <div>

                  <label className="block mb-2 font-medium">

                    Nationality

                  </label>


                  <input

                    name="nationality"

                    value={formData.nationality}

                    onChange={handleChange}

                    className="w-full border rounded-xl px-4 py-3"

                  />

                </div>





                <div>

                  <label className="block mb-2 font-medium">

                    Marital Status

                  </label>


                  <select

                    name="maritalStatus"

                    value={formData.maritalStatus}

                    onChange={handleChange}

                    className="w-full border rounded-xl px-4 py-3"

                  >

                    <option value="">
                      Select
                    </option>

                    <option>
                      Single
                    </option>

                    <option>
                      Married
                    </option>

                    <option>
                      Divorced
                    </option>


                  </select>

                </div>



              </div>


            </div>



          </div>



        </Card>        {/* ADDRESS INFORMATION */}


        <Card className="p-8">


          <div className="flex items-center gap-3 mb-8">


            <MapPin className="text-blue-600"/>


            <h2 className="text-2xl font-bold">

              Address Information

            </h2>


          </div>



          <div className="grid md:grid-cols-2 gap-6">



            <div className="md:col-span-2">


              <label className="block mb-2 font-medium">

                Home Address

              </label>



              <textarea

                rows="3"

                name="address"

                value={formData.address}

                onChange={handleChange}

                className="w-full border rounded-xl px-4 py-3"

              />



            </div>




            <div>


              <label className="block mb-2 font-medium">

                City

              </label>


              <input

                name="city"

                value={formData.city}

                onChange={handleChange}

                className="w-full border rounded-xl px-4 py-3"

              />


            </div>





            <div>


              <label className="block mb-2 font-medium">

                State

              </label>


              <input

                name="state"

                value={formData.state}

                onChange={handleChange}

                className="w-full border rounded-xl px-4 py-3"

              />


            </div>





            <div>


              <label className="block mb-2 font-medium">

                Country

              </label>


              <input

                name="country"

                value={formData.country}

                onChange={handleChange}

                className="w-full border rounded-xl px-4 py-3"

              />


            </div>



          </div>


        </Card>





        {/* EMPLOYMENT INFORMATION */}



        <Card className="p-8">


          <div className="flex items-center gap-3 mb-8">


            <Briefcase className="text-blue-600"/>


            <h2 className="text-2xl font-bold">

              Employment Information

            </h2>


          </div>




          <div className="grid md:grid-cols-2 gap-6">



            <div>


              <label className="block mb-2 font-medium">

                Department

              </label>



              <select

                name="department"

                value={formData.department}

                onChange={handleChange}

                className="w-full border rounded-xl px-4 py-3"

              >

                <option>IT</option>

                <option>HR</option>

                <option>SMC</option>

                <option>Engineering</option>

                <option>Audit</option>

                <option>Legal</option>


              </select>


            </div>





            <div>


              <label className="block mb-2 font-medium">

                Job Title

              </label>


              <input

                name="jobTitle"

                value={formData.jobTitle}

                onChange={handleChange}

                className="w-full border rounded-xl px-4 py-3"

              />


            </div>





            <div>


              <label className="block mb-2 font-medium">

                Employment Type

              </label>



              <select

                name="employmentType"

                value={formData.employmentType}

                onChange={handleChange}

                className="w-full border rounded-xl px-4 py-3"

              >

                <option>
                  Full Time
                </option>

                <option>
                  Part Time
                </option>

                <option>
                  Contract
                </option>

                <option>
                  Intern
                </option>


              </select>


            </div>





            <div>


              <label className="block mb-2 font-medium">

                Manager

              </label>


              <input

                name="manager"

                value={formData.manager}

                onChange={handleChange}

                className="w-full border rounded-xl px-4 py-3"

              />


            </div>





            <div>


              <label className="block mb-2 font-medium">

                Hire Date

              </label>


              <input

                type="date"

                name="hireDate"

                value={formData.hireDate}

                onChange={handleChange}

                className="w-full border rounded-xl px-4 py-3"

              />


            </div>





            <div>


              <label className="block mb-2 font-medium">

                Office Location

              </label>


              <input

                name="officeLocation"

                value={formData.officeLocation}

                onChange={handleChange}

                className="w-full border rounded-xl px-4 py-3"

              />


            </div>





            <div>


              <label className="block mb-2 font-medium">

                Salary

              </label>


              <input

                type="number"

                name="salary"

                value={formData.salary}

                onChange={handleChange}

                className="w-full border rounded-xl px-4 py-3"

              />


            </div>





            <div>


              <label className="block mb-2 font-medium">

                Status

              </label>



              <select

                name="status"

                value={formData.status}

                onChange={handleChange}

                className="w-full border rounded-xl px-4 py-3"

              >

                <option>
                  Active
                </option>

                <option>
                  Inactive
                </option>


              </select>


            </div>



          </div>


        </Card>        {/* PROFESSIONAL INFORMATION */}


        <Card className="p-8">


          <div className="flex items-center gap-3 mb-8">


            <GraduationCap className="text-blue-600"/>


            <h2 className="text-2xl font-bold">

              Professional Information

            </h2>


          </div>




          <div className="grid md:grid-cols-2 gap-6">


            <div>


              <label className="block mb-2 font-medium">

                Education

              </label>


              <input

                name="education"

                value={formData.education}

                onChange={handleChange}

                className="w-full border rounded-xl px-4 py-3"

              />


            </div>




            <div>


              <label className="block mb-2 font-medium">

                Skills

              </label>


              <input

                name="skills"

                value={formData.skills}

                onChange={handleChange}

                className="w-full border rounded-xl px-4 py-3"

              />


            </div>




            <div className="md:col-span-2">


              <label className="block mb-2 font-medium">

                Biography

              </label>


              <textarea

                rows="5"

                name="bio"

                value={formData.bio}

                onChange={handleChange}

                className="w-full border rounded-xl px-4 py-3"

              />


            </div>



          </div>


        </Card>





        {/* EMERGENCY CONTACT */}



        <Card className="p-8">


          <div className="flex items-center gap-3 mb-8">


            <Heart className="text-red-500"/>


            <h2 className="text-2xl font-bold">

              Emergency Contact

            </h2>


          </div>




          <div className="grid md:grid-cols-3 gap-6">



            <input

              name="emergencyName"

              value={formData.emergencyName}

              onChange={handleChange}

              placeholder="Full Name"

              className="border rounded-xl px-4 py-3"

            />



            <input

              name="emergencyRelationship"

              value={formData.emergencyRelationship}

              onChange={handleChange}

              placeholder="Relationship"

              className="border rounded-xl px-4 py-3"

            />



            <input

              name="emergencyPhone"

              value={formData.emergencyPhone}

              onChange={handleChange}

              placeholder="Phone"

              className="border rounded-xl px-4 py-3"

            />


          </div>


        </Card>





        {/* SOCIAL LINKS */}



        <Card className="p-8">


          <div className="flex items-center gap-3 mb-8">


            <Globe className="text-blue-600"/>


            <h2 className="text-2xl font-bold">

              Social Links

            </h2>


          </div>




          <div className="grid md:grid-cols-3 gap-6">



            <input

              type="url"

              name="linkedin"

              value={formData.linkedin}

              onChange={handleChange}

              placeholder="LinkedIn URL"

              className="border rounded-xl px-4 py-3"

            />




            <input

              type="url"

              name="github"

              value={formData.github}

              onChange={handleChange}

              placeholder="Github URL"

              className="border rounded-xl px-4 py-3"

            />




            <input

              type="url"

              name="website"

              value={formData.website}

              onChange={handleChange}

              placeholder="Website URL"

              className="border rounded-xl px-4 py-3"

            />



          </div>


        </Card>





        {/* BUTTONS */}



        <div className="flex justify-between bg-white p-6 rounded-2xl border">


          <Button

            type="button"

            onClick={()=>navigate("/employees")}

          >

            <div className="flex items-center gap-2">

              <ArrowLeft size={18}/>

              Cancel

            </div>


          </Button>





          <Button type="submit">


            <div className="flex items-center gap-2">


              <Save size={18}/>


              Update Employee


            </div>


          </Button>



        </div>



      </form>


    </AppLayout>


  );

}


export default EditEmployee;