import { createTheme, Pagination, ThemeProvider } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        type: "dark",
    },
})


export default function customPagination({setPage, numOfPages = 10}) {
    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0,0);
    }

    return(
        <div
        className="w-full flex justify-center mt-3"
        >
            <ThemeProvider theme={darkTheme} >
                <Pagination
                onChange={(e) => handlePageChange(e.target.textContent)}
                count={numOfPages}
                color="primary"
                hideNextButton
                hidePrevButton
                />
            </ThemeProvider>
        </div>
    )
}