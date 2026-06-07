import Button from "@mui/material/Button";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

export default function jobsTableData(jobs, navigate) {
  const columns = [
    { Header: "Title", accessor: "title", align: "left" },
    { Header: "Budget", accessor: "budget", align: "center" },
    { Header: "Status", accessor: "status", align: "center" },
    { Header: "Job Category", accessor: "jobCategory", align: "center" },
    { Header: "Actions", accessor: "actions", align: "center" },
  ];

  const rows = jobs.map((job) => ({
    id: job.id,
    title: job.title,
    description: job.description,
    budget: job.budget,
    status: job.status,
    employerName: job.employerName,
    employerSurname: job.employerSurname,
    jobCategory: job.jobCategoryName,
    jobCategoryId: job.jobCategoryId,
    createdDate: job.createdDate,
    updatedDate: job.updatedDate,
    completedDate: job.completedDate,
    actions: (
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={() => {
           navigate(`/jobs/${job.id}`);
        }}
      >
        Detay
      </Button>
    ),
  }));

  return { columns, rows };
}
