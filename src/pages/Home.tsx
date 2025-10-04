import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Play, BarChart3, BookOpen, GraduationCap, Sparkles } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Play,
      title: "Interactive Visualization",
      description: "Watch algorithms come to life with step-by-step animated visualizations",
      action: () => navigate("/visualize"),
    },
    {
      icon: BarChart3,
      title: "Complexity Analysis",
      description: "Understand Big-O notation with visual graphs and comparison tables",
      action: () => navigate("/complexity"),
    },
    {
      icon: BookOpen,
      title: "Learning Mode",
      description: "Study pseudocode and detailed explanations for each algorithm",
      action: () => navigate("/learn"),
    },
    {
      icon: GraduationCap,
      title: "Test Your Knowledge",
      description: "Challenge yourself with interactive quizzes and instant feedback",
      action: () => navigate("/quiz"),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            AlgoVision
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Master algorithms through interactive visualization, in-depth analysis, and hands-on learning
        </p>
        <div className="flex gap-4 justify-center pt-6">
          <Button size="lg" onClick={() => navigate("/visualize")} className="gap-2">
            <Play className="h-5 w-5" />
            Start Visualizing
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/learn")} className="gap-2">
            <BookOpen className="h-5 w-5" />
            Learn More
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="hover:border-primary/50 transition-all cursor-pointer group"
            onClick={feature.action}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Algorithms Covered */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Algorithms Covered</CardTitle>
          <CardDescription>Explore a comprehensive collection of sorting and searching algorithms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-3 text-primary">Sorting Algorithms</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
              {["Bubble Sort", "Merge Sort", "Quick Sort", "Heap Sort"].map((algo) => (
                <div key={algo} className="p-3 rounded-lg bg-secondary text-center hover:bg-secondary/70 transition-colors">
                  {algo}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-3 text-accent">Searching Algorithms</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {["Linear Search", "Binary Search"].map((algo) => (
                <div key={algo} className="p-3 rounded-lg bg-secondary text-center hover:bg-secondary/70 transition-colors">
                  {algo}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
