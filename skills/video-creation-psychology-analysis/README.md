# 视频创作心理分析 Skill

这是一个用于拆解知识类视频、口播视频、科普视频的 Skill 包。

它不是帮你简单列出“画面是什么”，而是分析创作者在每一句口播背后为什么选择对应画面、素材和动效。

## 核心能力

- 逐镜头拆解口播与画面对应关系；
- 分析“为什么偏偏用这个画面/动效”；
- 对比录屏、截图墙、纯文字、真人、论文堆等替代方案；
- 提炼可复用的视频创作模板；
- 生成 Remotion / AE / Keynote 复刻任务书；
- 帮你建立自己的素材库和动效组件库。

## 目录结构

```text
video-creation-psychology-analysis-skill/
├── SKILL.md
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── install/
│   ├── install.sh
│   └── install.ps1
├── .claude/
│   └── commands/
│       └── video-psychology.md
├── templates/
│   └── 逐镜头深层拆解表模板.md
├── checklists/
│   └── 视频创作心理分析检查清单.md
├── prompts/
│   └── 视频拆解提示词.md
└── examples/
    └── 开场镜头深层分析示例.md
```

## Codex 安装方式

把本 Skill 复制到目标项目：

```bash
mkdir -p .skills
cp -R video-creation-psychology-analysis-skill .skills/video-creation-psychology-analysis
cat .skills/video-creation-psychology-analysis/AGENTS.md >> AGENTS.md
```

之后在 Codex 中可以这样说：

```text
请读取 .skills/video-creation-psychology-analysis/SKILL.md，
按照这个 Skill 拆解我上传的视频，重点分析每个镜头为什么偏偏这样配画面和动效。
```

## Claude Code 安装方式

把本 Skill 复制到目标项目：

```bash
mkdir -p .skills .claude/commands
cp -R video-creation-psychology-analysis-skill .skills/video-creation-psychology-analysis
cat .skills/video-creation-psychology-analysis/CLAUDE.md >> CLAUDE.md
cp .skills/video-creation-psychology-analysis/.claude/commands/video-psychology.md .claude/commands/video-psychology.md
```

之后在 Claude Code 中可以使用命令文件：

```text
/video-psychology
```

或者直接说：

```text
请读取 .skills/video-creation-psychology-analysis/SKILL.md，按这个标准拆解视频。
```

## 一键安装

macOS / Linux：

```bash
bash install/install.sh /path/to/your/project
```

Windows PowerShell：

```powershell
powershell -ExecutionPolicy Bypass -File install/install.ps1 -ProjectPath "C:\path\to\your\project"
```

## 核心一句话

> 不是问“这句话配什么画面好看”，而是问“这句话需要让观众完成什么心理动作”。
