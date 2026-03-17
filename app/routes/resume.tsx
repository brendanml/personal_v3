import Page from "~/components/Page"
import resumePdf from "~/assets/BrendanLynch_Resume.pdf"
import { Button } from "~/components/ui/button"
import DownloadIcon from "@mui/icons-material/Download"

export default function Resume() {
    return (
        <Page>
            <div className="col-span-12 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-secondary">Resume</h1>
                    <Button asChild variant="outline" size="sm">
                        <a href={resumePdf} download="BrendanLynch_Resume.pdf">
                            <DownloadIcon fontSize="inherit" />
                            Download
                        </a>
                    </Button>
                </div>
                <embed
                    src={resumePdf}
                    type="application/pdf"
                    className="w-full rounded-lg border border-border"
                    style={{ height: "80vh" }}
                />
            </div>
        </Page>
    )
}
