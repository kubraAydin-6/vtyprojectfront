import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import meService from "services/meService";
import alertify from "alertifyjs";

function CreateJob() {

  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: 0,
    completedDate: null,
    status: 0,
    jobCategoryId: "",
  });
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createJob = async () => {

    try {

      await meService.createJobAsync(form);

      alertify.success("İş başarıyla eklendi");

      navigate("/profile");

    } catch (error) {

      alertify.error("Bir hata oluştu");

    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>

            <Card>

              <MDBox p={3}>
                <MDTypography variant="h4" mb={3}>
                  Yeni İş Ekle
                </MDTypography>

                <MDBox mb={2}>
                  <MDInput
                    fullWidth
                    label="Başlık"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                  />
                </MDBox>

                <MDBox mb={2}>
                  <MDInput
                    fullWidth
                    multiline
                    rows={5}
                    label="Açıklama"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                  />
                </MDBox>

                <MDBox mb={2}>
                  <MDInput
                    fullWidth
                    type="number"
                    label="Bütçe"
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    fullWidth
                    type="date"
                    name="completedDate"
                    value={form.completedDate}
                    onChange={handleChange}
                  />
                </MDBox>

                <MDBox mb={2}>
                  <MDInput
                    fullWidth
                    label="Status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  />
                </MDBox>

                <MDBox mb={2}>
                  <MDInput
                    fullWidth
                    label="Kategori Id"
                    name="jobCategoryId"
                    value={form.jobCategoryId}
                    onChange={handleChange}
                  />
                </MDBox>

                <MDButton
                  variant="gradient"
                  color="info"
                  onClick={createJob}
                >
                  Kaydet
                </MDButton>

              </MDBox>

            </Card>

          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default CreateJob;