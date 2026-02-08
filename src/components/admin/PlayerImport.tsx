import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Check, AlertTriangle, Download, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/contexts/AdminContext";
import { Player, Position } from "@/data/types";
import { toast } from "sonner";
import Papa from "papaparse";

const SAMPLE_CSV = `id,name,team,position,salary,points
p101,Kylian Mbappé,Real Madrid,FWD,12500,0
p102,Jude Bellingham,Real Madrid,MID,11000,0
p103,Rodri,Man City,MID,9500,0
p104,Pedri,Barcelona,MID,9000,0
p105,Marc-André ter Stegen,Barcelona,GK,7000,0`;

export function PlayerImport() {
  const { players, addPlayers } = useAdmin();
  const [preview, setPreview] = useState<Player[]>([]);
  const [importing, setImporting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const validPositions: Position[] = ["GK", "DEF", "MID", "FWD"];

  const parseCSV = (text: string) => {
    const result = Papa.parse(text, { header: true, skipEmptyLines: true });
    const errs: string[] = [];
    const parsed: Player[] = [];

    result.data.forEach((row: any, i: number) => {
      const lineNum = i + 2;
      if (!row.id || !row.name || !row.team || !row.position || !row.salary) {
        errs.push(`Row ${lineNum}: Missing required fields`);
        return;
      }
      if (!validPositions.includes(row.position as Position)) {
        errs.push(`Row ${lineNum}: Invalid position "${row.position}" (use GK/DEF/MID/FWD)`);
        return;
      }
      const salary = parseInt(row.salary);
      if (isNaN(salary) || salary <= 0) {
        errs.push(`Row ${lineNum}: Invalid salary "${row.salary}"`);
        return;
      }
      parsed.push({
        id: row.id.trim(),
        name: row.name.trim(),
        team: row.team.trim(),
        position: row.position.trim() as Position,
        salary,
        points: parseInt(row.points) || 0,
        imageUrl: "",
      });
    });

    setErrors(errs);
    setPreview(parsed);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      parseCSV(text);
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (preview.length === 0) return;
    setImporting(true);
    setTimeout(() => {
      addPlayers(preview);
      toast.success(`${preview.length} players imported successfully!`);
      setPreview([]);
      setImporting(false);
      if (fileRef.current) fileRef.current.value = "";
    }, 500);
  };

  const handleDownloadSample = () => {
    const blob = new Blob([SAMPLE_CSV], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "undermine_players_sample.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="glass rounded-xl p-6">
        <h2 className="font-display text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
          <Upload className="w-5 h-5 text-primary" />
          Import Player Data
        </h2>
        <p className="text-xs text-muted-foreground mb-5">Upload a CSV file with player data. Required columns: id, name, team, position, salary</p>

        <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/40 transition-colors mb-4">
          <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground mb-3">Drop your CSV here or click to browse</p>
          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            onChange={handleFile}
            className="hidden"
            id="csv-upload"
          />
          <label htmlFor="csv-upload">
            <Button variant="outline" className="cursor-pointer" asChild>
              <span>Choose File</span>
            </Button>
          </label>
        </div>

        <Button variant="ghost" size="sm" onClick={handleDownloadSample} className="text-xs text-muted-foreground hover:text-foreground">
          <Download className="w-3 h-3 mr-1" />
          Download sample CSV
        </Button>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-xl p-4 border border-destructive/30">
          <p className="text-sm font-semibold text-destructive flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4" />
            {errors.length} validation error{errors.length > 1 ? "s" : ""}
          </p>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {errors.map((err, i) => (
              <p key={i} className="text-xs text-muted-foreground">{err}</p>
            ))}
          </div>
        </motion.div>
      )}

      {/* Preview */}
      {preview.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display text-sm font-semibold text-foreground">
              Preview ({preview.length} players)
            </h3>
            <Button onClick={handleImport} disabled={importing} className="bg-primary text-primary-foreground hover:bg-primary/90 glow-sm">
              {importing ? (
                <span className="animate-pulse">Importing...</span>
              ) : (
                <><Check className="w-4 h-4 mr-2" />Confirm Import</>
              )}
            </Button>
          </div>

          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">Name</th>
                    <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">Team</th>
                    <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">Pos</th>
                    <th className="text-right px-4 py-2.5 text-xs text-muted-foreground font-medium">Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.slice(0, 10).map((p) => (
                    <tr key={p.id} className="border-b border-border/50">
                      <td className="px-4 py-2 text-foreground">{p.name}</td>
                      <td className="px-4 py-2 text-muted-foreground">{p.team}</td>
                      <td className="px-4 py-2">
                        <span className="text-[10px] font-bold text-primary">{p.position}</span>
                      </td>
                      <td className="px-4 py-2 text-right font-display font-semibold text-foreground">
                        ${(p.salary / 1000).toFixed(1)}k
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {preview.length > 10 && (
                <p className="text-xs text-muted-foreground text-center py-2">
                  ...and {preview.length - 10} more
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Current Players Count */}
      <div className="glass rounded-xl p-4 flex items-center gap-3">
        <Users className="w-5 h-5 text-primary" />
        <div>
          <p className="text-sm font-semibold text-foreground">{players.length} players in database</p>
          <p className="text-xs text-muted-foreground">
            GK: {players.filter((p) => p.position === "GK").length} •
            DEF: {players.filter((p) => p.position === "DEF").length} •
            MID: {players.filter((p) => p.position === "MID").length} •
            FWD: {players.filter((p) => p.position === "FWD").length}
          </p>
        </div>
      </div>
    </div>
  );
}
