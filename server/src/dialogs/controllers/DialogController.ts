// server/src/dialogs/controllers/DialogController.ts


import {Request, Response} from "express";
import {DialogRepository} from "../repositories/DialogRepository";
import {DialogGraphMermaidRenderer} from "../renderers/DialogGraphMermaidRenderer";
import {execFile} from "child_process";
import {tmpdir} from "os";
import {readFile, unlink, writeFile} from "fs/promises";
import {join} from "path";
import {DialogIndexMermaidRenderer} from "../renderers/DialogIndexMermaidRenderer";
import { DialogAssembler } from "../assemblers/DialogAssembler";

export class DialogController {

  constructor(private readonly repo: DialogRepository) {}

  getDialog = async (req: Request, res: Response) => {
    const dialogId = req.params.dialogId as string;
    const model = await this.repo.getDialog(dialogId);
    if (!model) return res.status(404).json({ error: "Dialog not found" });

    return res.json(DialogAssembler.toFullDialogDto(model));
  };

  listDialogs = async (_req: Request, res: Response) => {
    const models = await this.repo.listDialogs();
    return res.json(models.map(DialogAssembler.toFullDialogDto));
  };

  createDialog = async (req: Request, res: Response) => {
    const { title, displayMode, chatBotId } = req.body;
    const model = await this.repo.createDialog({ title, displayMode, chatBotId });
    return res.json(DialogAssembler.toFullDialogDto(model));
  };

  updateDialog = async (req: Request, res: Response) => {
    const dialogId = req.params.dialogId as string;
    const model = await this.repo.updateDialog(dialogId, req.body);
    return res.json(DialogAssembler.toFullDialogDto(model));
  };

  deleteDialog = async (req: Request, res: Response) => {
    const dialogId = req.params.dialogId as string;
    await this.repo.deleteDialog(dialogId);
    return res.json({ success: true });
  };

  getDialogMermaid = async (req: Request, res: Response) => {
    const dialogId = req.params.dialogId as string;

    const model = await this.repo.getDialog(dialogId);
    if (!model) return res.status(404).json({ error: "DIALOG_NOT_FOUND" });

    const mermaid = DialogGraphMermaidRenderer.render(model);

    res.setHeader("Content-Type", "text/plain");
    return res.send(mermaid);
  };

  getDialogGraphJson = async (req: Request, res: Response) => {
    const dialogId = req.params.dialogId as string;

    const model = await this.repo.getDialog(dialogId);
    if (!model) return res.status(404).json({ error: "DIALOG_NOT_FOUND" });

    res.json(model);
  };

  getDialogGraphSvg = async (req: Request, res: Response) => {
    const dialogId = req.params.dialogId as string;

    const model = await this.repo.getDialog(dialogId);
    if (!model) return res.status(404).json({ error: "DIALOG_NOT_FOUND" });

    const mermaid = DialogGraphMermaidRenderer.render(model);

    const input = join(tmpdir(), `dialog-${dialogId}.mmd`);
    const output = join(tmpdir(), `dialog-${dialogId}.svg`);

    await writeFile(input, mermaid, "utf8");

    await new Promise<void>((resolve, reject) => {
      execFile("mmdc", ["-i", input, "-o", output], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const svg = await readFile(output, "utf8");

    await unlink(input);
    await unlink(output);

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(svg);
  };

  getDialogIndexMermaid = async (_req: Request, res: Response) => {
    const dialogs = await this.repo.getAllDialogsWithLinks();
    const mermaid = DialogIndexMermaidRenderer.render(dialogs);

    res.setHeader("Content-Type", "text/plain");
    res.send(mermaid);
  };

}
