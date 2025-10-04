import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Algorithm = "bubble" | "merge" | "quick" | "heap" | "linear" | "binary";

const Visualize = () => {
  const [array, setArray] = useState<number[]>([]);
  const [algorithm, setAlgorithm] = useState<Algorithm>("bubble");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState([50]);
  const [currentStep, setCurrentStep] = useState(0);
  const [comparing, setComparing] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 10);
    setArray(newArray);
    setCurrentStep(0);
    setComparing([]);
    setSorted([]);
    setIsPlaying(false);
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    toast({
      title: isPlaying ? "Paused" : "Playing",
      description: `${algorithm} algorithm visualization ${isPlaying ? "paused" : "started"}`,
    });
  };

  const handleReset = () => {
    generateArray();
    toast({
      title: "Reset",
      description: "Array regenerated and visualization reset",
    });
  };

  const getBarColor = (index: number) => {
    if (sorted.includes(index)) return "bg-sorted";
    if (comparing.includes(index)) return "bg-comparing";
    return "bg-primary";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Algorithm Visualization</h1>
          <p className="text-muted-foreground">Watch algorithms in action step-by-step</p>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Controls</CardTitle>
          <CardDescription>Select an algorithm and control the visualization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Algorithm</label>
              <Select value={algorithm} onValueChange={(value) => setAlgorithm(value as Algorithm)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bubble">Bubble Sort</SelectItem>
                  <SelectItem value="merge">Merge Sort</SelectItem>
                  <SelectItem value="quick">Quick Sort</SelectItem>
                  <SelectItem value="heap">Heap Sort</SelectItem>
                  <SelectItem value="linear">Linear Search</SelectItem>
                  <SelectItem value="binary">Binary Search</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Speed: {speed[0]}%</label>
              <Slider value={speed} onValueChange={setSpeed} min={10} max={100} step={10} />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button onClick={handlePlay} className="gap-2">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? "Pause" : "Play"}
            </Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button variant="outline" className="gap-2">
              <SkipForward className="h-4 w-4" />
              Step
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Visualization</CardTitle>
          <CardDescription>Current step: {currentStep}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-center gap-1 h-[400px] p-4 bg-secondary/20 rounded-lg">
            {array.map((value, index) => (
              <div
                key={index}
                className={`flex-1 ${getBarColor(index)} rounded-t transition-all duration-300 flex items-end justify-center pb-2`}
                style={{ height: `${(value / 110) * 100}%` }}
              >
                <span className="text-xs font-semibold text-white">{value}</span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex gap-6 mt-4 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded" />
              <span>Unsorted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-comparing rounded" />
              <span>Comparing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-sorted rounded" />
              <span>Sorted</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Comparisons</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Array Accesses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-accent">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Time Elapsed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-warning">0ms</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Visualize;
