import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@material-ui/core";

function AppliedToJobsPage() {

  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  const appliedJobsList = useSelector(
    (store) => store.candidateReducer.appliedJobs
  );

  console.log("jobs applied to:", appliedJobsList);

  useEffect(() => {
    dispatch({ type: "FETCH_APPLIED_JOBS" });
  }, []);

  const useStyles = makeStyles({
    table: {
      tableLayout: "fixed",
      width: "100%",
    },
    td: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}></Grid>
        <Grid item xs={8}><h1>AppliedToJobsPage - CANDIDATE</h1></Grid>

        <Grid item xs={3}></Grid>
        <Grid sx={{ marginTop: 4 }}>
          <section>
            {appliedJobsList.map((job) => {
              return (
                <Grid container >
                  <Grid item xs={3}></Grid>
                  <Grid item xs={9}></Grid>
                  <Box
                    key={job.id}
                    sx={{ width: '50em', borderRadius: '5px', boxShadow: 3, padding: '10px', border: 'solid grey 1px', display: "flex", justifyContent: 'space-between', marginBottom: 2 }}
                  >
                    <Box sx={{ width: '50%' }}>
                      {" "}
                      <Typography variant='h4' sx={{ fontSize: 4 }}
                        onClick={() => {
                          history.push(`/job/${job.id}`);
                          dispatch({
                            type: "VIEW_JOB_DETAILS",
                            payload: job,
                          });
                        }}
                      >
                        {" "}
                        {job.title}{" "}
                      </Typography>

                      <Box>
                        <Typography sx={{ fontSize: 3 }}>{job.company_name}</Typography>
                      </Box>
                      <Button
                        variant='contained'
                        onClick={() => {
                          history.push(`/CandidateJobDetails/${job.id}`);
                          dispatch({
                            type: "VIEW_JOB_DETAILS",
                            payload: `${params.id}`,
                          });
                        }}
                      >
                        DETAILS
                      </Button>

                    </Box>

                    <Box sx={{ width: '50%', display: "flex", alignSelf: "flex-end", display: "flex", justifyContent: "flex-end" }}>
                      {" "}
                      {job.status === "pending" ? (
                        <p>Applied on {new Date(job.time).toLocaleString()}</p>
                      ) : (
                        <></>
                      )}
                    </Box>

                    <Box >
                      {job.status === "not_shared" ? (
                        <>
                          <p>Applied on {new Date(job.time).toLocaleString()}</p>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              dispatch({
                                type: "SET_JOB_MESSAGE",
                                payload: job.id,
                              });
                              history.push(`/message/${job.id}`);
                              console.log("application id:", job.id);
                            }}
                          >
                            Chat
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              console.log("Sharing info for job id:", job.id)
                              dispatch({
                                type: "SHARE_INFO",
                                payload: job.id

                              })
                            }}
                          >
                            Share Information
                          </Button>
                        </>
                      ) : (
                        <></>
                      )}
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
                      {job.status === "shared" ? (
                        <>
                          <p >Person info shared with employer-Applied on {new Date(job.time).toLocaleString()}</p>
                          <br />
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              dispatch({
                                type: "SET_JOB_MESSAGE",
                                payload: job.id,
                              });
                              history.push(`/message/${job.id}`);
                              console.log("application id:", job.id);
                            }}
                          >
                            Chat
                          </Button>
                        </>
                      ) : (
                        <></>
                      )}
                    </Box>
                    <Box>
                      {job.status === "rejected" ? (
                        <>
                          <p>Applied on {new Date(job.time).toLocaleString()}</p>
                          <br />
                          <p>Not selected for this position</p>
                        </>
                      ) : (
                        <></>
                      )}
                    </Box>


                  </Box>
                </Grid>);
            })}
          </section>
        </Grid>
      </Grid>
    </>
  );
}

export default AppliedToJobsPage;


