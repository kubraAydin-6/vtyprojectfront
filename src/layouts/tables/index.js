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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import projectsTableData from "layouts/tables/data/projectsTableData";

import { useEffect, useState } from "react";
import jobsTableData from "layouts/tables/data/jobsTableData";
import { useNavigate } from "react-router-dom";

function Tables() {
  const [jobs, setJobs] = useState([]);

  // kategori listesi
  const [categories, setCategories] = useState([]);

  // seçilen kategori
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("");
  // jobları çek
  useEffect(() => {
    fetch("https://localhost:7275/api/job/alljob")
      .then((res) => res.json())
      .then((data) => {
        console.log("JOBS RAW:", data);

        data.forEach((job) => {
          console.log("JOB ID:", job.id);
        });

        setJobs(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // kategorileri çek
  useEffect(() => {
    fetch("https://localhost:7275/api/jobcategory/list")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        console.log("JOBS:", data);        // 👈 bunu ekle
        console.log("FIRST JOB:", data[0]); // 👈 bunu ekle
      })
      .catch((err) => console.log(err));
  }, []);

  // filtrelenmiş joblar
  let filteredJobs =
    selectedCategory === ""
      ? [...jobs]
      : jobs.filter(
        (job) =>
          String(job.jobCategoryId).toLocaleLowerCase() ===
          String(selectedCategory).toLocaleLowerCase()
      );

  if (sortType === "asc") {
    filteredJobs.sort((a, b) => a.budget - b.budget);
  }

  if (sortType === "desc") {
    filteredJobs.sort((a, b) => b.budget - a.budget);
  }


  const { columns, rows } = jobsTableData(filteredJobs, navigate);
  const { columns: pColumns, rows: pRows } = projectsTableData();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                // sağ-sol hizalama
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h6" color="white">
                  Jobs Table
                </MDTypography>
                {/* SELECTBOX */}
                <FormControl
                  size="small"
                  sx={{
                    minWidth: 220,
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Select
                    value={selectedCategory}
                    onChange={(e) =>
                      setSelectedCategory(e.target.value)
                    }
                    displayEmpty
                  >
                    <MenuItem value="">
                      Kategoriler
                    </MenuItem>

                    {categories.map((category) => (
                      <MenuItem
                        key={category.id}
                        value={String(category.id)}
                      >
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Sıralama */}
                <FormControl
                  size="small"
                  sx={{
                    minWidth: 220,
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Select
                    value={sortType}
                    onChange={(e) => setSortType(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="">
                      Bütçe Sıralama
                    </MenuItem>

                    <MenuItem value="asc">
                      Düşükten Yükseğe
                    </MenuItem>

                    <MenuItem value="desc">
                      Yüksekten Düşüğe
                    </MenuItem>
                  </Select>
                </FormControl>

              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
