import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import TextField from "@mui/material/TextField";

import meService from "services/meService";
import alertify from "alertifyjs";

function UpdateJob() {
  const location = useLocation();
  const navigate = useNavigate();
    
  const [job, setJob] = useState({
    id: "",
    title: "",
    description: "",
    budget: 0,
    jobCategoryId: "",
  });

  // 📌 Load job
  const fetchJob = async (id) => {
    try {
      const data = await meService.getJobByIdAsync(id);

      setJob({
        id: data.id || "",
        title: data.title || "",
        description: data.description || "",
        budget: data.budget || 0,
        jobCategoryId: data.jobCategoryId || "",
      });
    } catch (err) {
        console.log(err.response?.data);
console.log(err);
      alertify.error("İş bilgisi alınamadı");
      navigate("/profile");
    }
  };

  // 📌 init
  useEffect(() => {
    const stateJob = location.state;

    if (stateJob) {
      setJob({
        id: stateJob.id || "",
        title: stateJob.title || "",
        description: stateJob.description || "",
        budget: stateJob.budget || 0
      });
    } else {
      const idFromPath = location.pathname.split("/").pop();
      if (idFromPath) fetchJob(idFromPath);
    }
  }, []);

  // 📌 change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setJob((prev) => ({
      ...prev,
      [name]: name === "budget" ? Number(value) : value
    }));
  };

  // 📌 update
  const handleUpdate = async () => {
    try {
      const payload = {
        id: job.id,
        title: job.title,
        description: job.description,
        budget: Number(job.budget),
        jobCategoryId: job.jobCategoryId,
      };

      await meService.updateJobAsync(payload);

      alertify.success("İş güncellendi");
      navigate("/profile");
    } catch (error) {
      console.log(error.response?.data || error);
      alertify.error("Güncelleme hatası");
    }
  };

  return (
  <MDBox
    p={3}
    sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
      marginLeft: pxToRem(274), // sidebar açık hali
      transition: transitions.create(["margin-left"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),

      [breakpoints.down("lg")]: {
        marginLeft: pxToRem(0), // mobilde full width
      },
    })}
  >
    <MDTypography variant="h4" mb={3}>
      İş Güncelle
    </MDTypography>

    <TextField
      fullWidth
      label="Title"
      name="title"
      value={job.title}
      onChange={handleChange}
      sx={{ mb: 2 }}
    />

    <TextField
      fullWidth
      label="Description"
      name="description"
      value={job.description}
      onChange={handleChange}
      sx={{ mb: 2 }}
    />

    <TextField
      fullWidth
      label="Budget"
      name="budget"
      type="number"
      value={job.budget}
      onChange={handleChange}
      sx={{ mb: 2 }}
    />
    <TextField
      fullWidth
      label="Job Category Id"
      name="jobCategoryId"
      type="text"
      value={job.jobCategoryId}
      onChange={handleChange}
      sx={{ mb: 2 }}
    />

    <MDButton
      variant="gradient"
      color="success"
      fullWidth
      onClick={handleUpdate}
    >
      Güncelle
    </MDButton>
  </MDBox>
);
}

export default UpdateJob;