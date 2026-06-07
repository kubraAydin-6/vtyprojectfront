import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Header
import Header from "layouts/profile/components/Header";

// MUI
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Bill from "./bill-profile";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import alertify from "alertifyjs";
import meService from "../../../services/meService";

function JobProfile() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [priceOffers, setPriceOffers] = useState([]);
  const handlePriceOffer = () => {

    alertify.prompt(
      "Fiyat Teklifi",
      "Teklifinizi giriniz:",
      "",
      async (evt, value) => {

        try {

          const request = {
            offeredPrice: Number(value),
            jobId: id,
          };

          await meService.postPriceOfferProfile(request);

          alertify.success("Teklif gönderildi");

        } catch (error) {

          console.log(error);
          alertify.error("Hata oluştu");
        }
      },

      () => {
        alertify.error("İptal edildi");
      }
    );
  };
  useEffect(() => {

    fetch(`https://localhost:7275/api/job/jobprofileinformation/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetch(`https://localhost:7275/api/priceoffer/priceofferlist/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("PRICE OFFERS RAW:", data);

        setPriceOffers(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!job) return <div>Loading...</div>;

  return (
    <>
      <DashboardLayout>

        <DashboardNavbar />

        <MDBox mt={2} mb={2}>
          <Card sx={{ p: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12}>

                <MDTypography variant="h4" fontWeight="medium" color="success">
                  {job.employerName} {job.employerSurname}
                </MDTypography>
              </Grid>

              {/* JOB TITLE */}
              <Grid item xs={12}>
                <MDTypography variant="h5" fontWeight="bold">
                  {job.title}
                </MDTypography>
              </Grid> {/* DESCRIPTION */}
              <Grid item xs={12}>
                <MDTypography variant="h6" color="text">
                  📌 Description : {job.description}
                </MDTypography>
              </Grid> {/* DETAILS */}
              <Grid item xs={12} md={6}>
                <MDTypography variant="h6" color="text">
                  💰 Budget: {job.budget}
                </MDTypography>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDTypography variant="h6" color="text">
                  📌 Category: {job.jobCategoryName}
                </MDTypography>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDTypography variant="h6" color="text">
                  📌 Status: {job.status}
                </MDTypography>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDTypography variant="h6" color="text">
                  📌 Created: {job.createdDate}
                </MDTypography>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDTypography variant="h6" color="text">
                  📌 Updated: {job.updatedDate}
                </MDTypography>
              </Grid>
              <Grid item xs={12} md={6}>
                <MDTypography variant="h6" color="text">
                  📌 Compleated: {job.completedDate}
                </MDTypography>
              </Grid>

            </Grid>
          </Card>
        </MDBox>

        <Card id="delete-account">

          <MDBox pt={3} px={2}>
            <MDTypography variant="h5" fontWeight="medium">
              Fiyat Teklifleri
            </MDTypography>
            <MDBox mr={1}>
              <MDButton variant="text" color="success" onClick={handlePriceOffer}>
                <Icon>create</Icon>&nbsp;Fiyat Teklifi Ver
              </MDButton>
            </MDBox>
          </MDBox>

          <MDBox pt={1} pb={2} px={2}>
            <MDBox
              component="ul"
              display="flex"
              flexDirection="column"
              p={0}
              m={0}
            >

              {priceOffers.map((offer) => (
                <Bill
                  key={offer.id}
                  name={offer.freelancerName}
                  priceoffer={offer.offeredPrice}
                  create={offer.createdDate}
                />
              ))}

            </MDBox>
          </MDBox>

        </Card>

      </DashboardLayout>
    </>
  );
}

export default JobProfile;






/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Billing page components


