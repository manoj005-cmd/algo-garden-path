import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileImage, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Export = () => {
  const { toast } = useToast();

  const handleExport = (format: string) => {
    toast({
      title: "Export Started",
      description: `Exporting visualization as ${format}...`,
    });
    
    // Simulate export
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Your file has been downloaded as ${format}`,
      });
    }, 1500);
  };

  const exportOptions = [
    {
      title: "Export Visualization",
      description: "Save the current algorithm visualization",
      formats: [
        { name: "PNG Image", ext: "PNG", icon: FileImage },
        { name: "SVG Vector", ext: "SVG", icon: FileImage },
      ],
    },
    {
      title: "Export Complexity Chart",
      description: "Save the complexity analysis graphs",
      formats: [
        { name: "PNG Image", ext: "PNG", icon: FileImage },
        { name: "PDF Document", ext: "PDF", icon: FileText },
      ],
    },
    {
      title: "Export Quiz Results",
      description: "Save your quiz performance report",
      formats: [
        { name: "PDF Report", ext: "PDF", icon: FileText },
        { name: "CSV Data", ext: "CSV", icon: FileText },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Export Results</h1>
        <p className="text-muted-foreground">Download visualizations, charts, and reports</p>
      </div>

      <div className="space-y-4">
        {exportOptions.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {section.formats.map((format) => (
                  <Button
                    key={format.ext}
                    variant="outline"
                    onClick={() => handleExport(format.ext)}
                    className="gap-2"
                  >
                    <format.icon className="h-4 w-4" />
                    {format.name}
                    <Download className="h-4 w-4 ml-1" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Export Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 rounded-lg bg-primary/10 border-l-4 border-primary">
            <p className="text-sm">
              <strong>PNG format:</strong> Best for embedding in presentations or sharing on social media
            </p>
          </div>
          <div className="p-3 rounded-lg bg-accent/10 border-l-4 border-accent">
            <p className="text-sm">
              <strong>SVG format:</strong> Vector graphics that scale perfectly for any resolution
            </p>
          </div>
          <div className="p-3 rounded-lg bg-success/10 border-l-4 border-success">
            <p className="text-sm">
              <strong>PDF format:</strong> Professional documents perfect for reports and printing
            </p>
          </div>
          <div className="p-3 rounded-lg bg-warning/10 border-l-4 border-warning">
            <p className="text-sm">
              <strong>CSV format:</strong> Raw data that can be imported into spreadsheets for further analysis
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Export;
