import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';

function ApplicantSharedInfo({ applicant }) {

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8} sx={{ borderRadius: '5px', boxShadow: 3, padding: '10px', border: 'solid grey 1px', marginTop: 5 }}>
                <Box>
                    <Typography sx={{ textAlign: "center" }}>
                        <h3>Applicant's shared information</h3>
                    </Typography>
                    <Typography
                        sx={{ display: "flex" }}>
                        Name: {applicant.profile[0].first_name} {applicant.profile[0].last_name}
                    </Typography>
                    <Typography
                        sx={{ display: "flex" }}>
                        Email: {applicant.profile[0].email}
                    </Typography>
                    <Typography
                        sx={{ display: "flex" }}>
                        {/* LinkedIn: */}
                        <a href={applicant.profile[0].linkedin_link} target="_blank">
                            {applicant.profile[0].linkedin_link}
                        </a>
                    </Typography>
                    <Box>
                        {/* <b>Resume:</b> */}
                        <button className='downloadLinkButton'>
                            <a
                                className="downloadLink"
                                href={applicant.profile[0].resume_path}
                                download={`${applicant.profile[0].first_name}-${applicant.profile[0].last_name}-resume.pdf`}
                            >
                                Download Resume
                            </a>
                        </button>
                        {/* <b>Cover Letter:</b> */}
                        <button>
                            <a
                                className="downloadLink"
                                href={applicant.profile[0].cover_letter_path}
                                download={`${applicant.profile[0].first_name}-${applicant.profile[0].last_name}-cover-letter.pdf`}
                            >
                                Download Cover Letter
                            </a>
                        </button>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={2}></Grid>
        </Grid>

    );
}

export default ApplicantSharedInfo