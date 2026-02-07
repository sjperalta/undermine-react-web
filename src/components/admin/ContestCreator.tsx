import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Calendar, DollarSign, Users, Swords, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdmin, AdminContest } from "@/contexts/AdminContext";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function ContestCreator() {
  const { contests, addContest, updateContest } = useAdmin();
  const [title, setTitle] = useState("");
  const [salaryCap, setSalaryCap] = useState("100000");
  const [maxEntrants, setMaxEntrants] = useState("5000");
  const [matches, setMatches] = useState("");
  const [startHours, setStartHours] = useState("4");

  const handleCreate = () => {
    if (!title.trim()) {
      toast.error("Contest title is required");
      return;
    }
    if (!matches.trim()) {
      toast.error("Add at least one match");
      return;
    }

    const newContest: AdminContest = {
      id: `c-${Date.now()}`,
      title: title.trim(),
      status: "draft",
      entryFee: 0,
      prizePool: "Glory",
      entrants: 0,
      maxEntrants: parseInt(maxEntrants) || 5000,
      startTime: new Date(Date.now() + parseInt(startHours) * 3600000).toISOString(),
      endTime: new Date(Date.now() + (parseInt(startHours) + 24) * 3600000).toISOString(),
      salaryCap: parseInt(salaryCap) || 100000,
      matches: matches.split(",").map((m) => m.trim()).filter(Boolean),
      scored: false,
      matchStats: [],
    };

    addContest(newContest);
    toast.success(`Contest "${title}" created!`);
    setTitle("");
    setMatches("");
  };

  const statusOrder = ["draft", "open", "locked", "completed"];
  const handleStatusCycle = (id: string, current: string) => {
    const nextIdx = (statusOrder.indexOf(current) + 1) % statusOrder.length;
    updateContest(id, { status: statusOrder[nextIdx] as AdminContest["status"] });
    toast.success(`Contest status → ${statusOrder[nextIdx].toUpperCase()}`);
  };

  return (
    <div className="space-y-8">
      {/* Create Form */}
      <div className="glass rounded-xl p-6">
        <h2 className="font-display text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary" />
          New Contest
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Contest Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Premier League GW25"
              className="bg-muted/50 border-border"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Matches (comma-separated)</Label>
            <Input
              value={matches}
              onChange={(e) => setMatches(e.target.value)}
              placeholder="e.g. Man City vs Liverpool, Arsenal vs Chelsea"
              className="bg-muted/50 border-border"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground flex items-center gap-1">
              <DollarSign className="w-3 h-3" /> Salary Cap
            </Label>
            <Input
              type="number"
              value={salaryCap}
              onChange={(e) => setSalaryCap(e.target.value)}
              className="bg-muted/50 border-border"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground flex items-center gap-1">
              <Users className="w-3 h-3" /> Max Entrants
            </Label>
            <Input
              type="number"
              value={maxEntrants}
              onChange={(e) => setMaxEntrants(e.target.value)}
              className="bg-muted/50 border-border"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Starts in (hours)
            </Label>
            <Input
              type="number"
              value={startHours}
              onChange={(e) => setStartHours(e.target.value)}
              className="bg-muted/50 border-border"
            />
          </div>
        </div>

        <Button onClick={handleCreate} className="bg-primary text-primary-foreground hover:bg-primary/90 glow-sm">
          <Plus className="w-4 h-4 mr-2" />
          Create Contest
        </Button>
      </div>

      {/* Contest List */}
      <div>
        <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Swords className="w-5 h-5 text-primary" />
          All Contests ({contests.length})
        </h2>

        <div className="space-y-2">
          {contests.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="glass rounded-lg p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground truncate">{c.title}</p>
                <p className="text-xs text-muted-foreground">
                  {c.matches.length} matches • {c.entrants} entrants • Cap: ${(c.salaryCap / 1000).toFixed(0)}k
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleStatusCycle(c.id, c.status)}>
                  <Badge
                    variant="outline"
                    className={`cursor-pointer text-[10px] font-bold tracking-widest ${
                      c.status === "open"
                        ? "bg-primary/20 text-primary border-primary/30"
                        : c.status === "locked"
                        ? "bg-live/20 text-live border-live/30"
                        : c.status === "completed"
                        ? "bg-muted text-muted-foreground border-border"
                        : "bg-secondary text-secondary-foreground border-border"
                    }`}
                  >
                    {c.status.toUpperCase()}
                  </Badge>
                </button>
                {c.scored && (
                  <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20">
                    SCORED
                  </Badge>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
