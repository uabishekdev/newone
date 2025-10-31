export const applyFrame = (
    ctx: CanvasRenderingContext2D, 
    canvas: HTMLCanvasElement, 
    frameId: string
  ): void => {
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.save();
    
    switch (frameId) {
      case "classic":
        drawClassicFrame(ctx, width, height);
        break;
      case "polaroid":
        drawPolaroidFrame(ctx, width, height);
        break;
      case "modern":
        drawModernFrame(ctx, width, height);
        break;
      case "vintage":
        drawVintageFrame(ctx, width, height);
        break;
      case "wood":
        drawWoodFrame(ctx, width, height);
        break;
      default:
        break;
    }
    
    ctx.restore();
  };
  
  export const getFrameDimensions = (frameId: string, canvasSize: number) => {
    const dimensions = {
      targetSize: canvasSize,
      targetX: 0,
      targetY: 0
    };
  
    switch (frameId) {
      case "classic":
        dimensions.targetSize = canvasSize - 160;
        dimensions.targetX = 80;
        dimensions.targetY = 80;
        break;
      case "polaroid":
        dimensions.targetSize = canvasSize - 200;
        dimensions.targetX = 100;
        dimensions.targetY = 100;
        break;
      case "modern":
        dimensions.targetSize = canvasSize - 120;
        dimensions.targetX = 60;
        dimensions.targetY = 60;
        break;
      case "vintage":
        dimensions.targetSize = canvasSize - 180;
        dimensions.targetX = 90;
        dimensions.targetY = 90;
        break;
      case "wood":
        dimensions.targetSize = canvasSize - 200;
        dimensions.targetX = 100;
        dimensions.targetY = 100;
        break;
      default:
        break;
    }
  
    return dimensions;
  };
  
  const drawClassicFrame = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const borderWidth = 80;
    
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 15;
    
    ctx.fillRect(0, 0, width, borderWidth);
    ctx.fillRect(0, 0, borderWidth, height);
    ctx.fillRect(width - borderWidth, 0, borderWidth, height);
    ctx.fillRect(0, height - borderWidth, width, borderWidth);
    
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = "#222222";
    ctx.lineWidth = 3;
    ctx.strokeRect(borderWidth - 1.5, borderWidth - 1.5, width - (borderWidth * 2) + 3, height - (borderWidth * 2) + 3);
  };
  
  const drawPolaroidFrame = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const borderTop = 100;
    const borderSide = 100;
    const borderBottom = 180;
    
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.shadowBlur = 25;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;
    
    ctx.fillRect(0, 0, width, borderTop);
    ctx.fillRect(0, 0, borderSide, height);
    ctx.fillRect(width - borderSide, 0, borderSide, height);
    ctx.fillRect(0, height - borderBottom, width, borderBottom);
    
    ctx.shadowColor = "transparent";
    ctx.fillStyle = "#F8F8F8";
    ctx.fillRect(borderSide, height - borderBottom, width - (borderSide * 2), borderBottom);
    
    ctx.strokeStyle = "#DDDDDD";
    ctx.lineWidth = 2;
    ctx.strokeRect(borderSide, borderTop, width - (borderSide * 2), height - borderTop - borderBottom);
  };
  
  const drawModernFrame = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const borderWidth = 60;
    
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#2C3E50");
    gradient.addColorStop(1, "#34495E");
    
    ctx.fillStyle = gradient;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;
    
    ctx.fillRect(0, 0, width, borderWidth);
    ctx.fillRect(0, 0, borderWidth, height);
    ctx.fillRect(width - borderWidth, 0, borderWidth, height);
    ctx.fillRect(0, height - borderWidth, width, borderWidth);
    
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = "#1ABC9C";
    ctx.lineWidth = 4;
    ctx.strokeRect(borderWidth, borderWidth, width - (borderWidth * 2), height - (borderWidth * 2));
  };
  
  const drawVintageFrame = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const borderWidth = 90;
    
    ctx.fillStyle = "#8B7355";
    ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
    ctx.shadowBlur = 35;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 12;
    
    ctx.fillRect(0, 0, width, borderWidth);
    ctx.fillRect(0, 0, borderWidth, height);
    ctx.fillRect(width - borderWidth, 0, borderWidth, height);
    ctx.fillRect(0, height - borderWidth, width, borderWidth);
    
    ctx.shadowColor = "transparent";
    
    ctx.fillStyle = "#D4AF37";
    const innerBorder = 10;
    ctx.fillRect(borderWidth - innerBorder, borderWidth - innerBorder, width - (borderWidth * 2) + (innerBorder * 2), innerBorder);
    ctx.fillRect(borderWidth - innerBorder, borderWidth - innerBorder, innerBorder, height - (borderWidth * 2) + (innerBorder * 2));
    ctx.fillRect(width - borderWidth, borderWidth - innerBorder, innerBorder, height - (borderWidth * 2) + (innerBorder * 2));
    ctx.fillRect(borderWidth - innerBorder, height - borderWidth, width - (borderWidth * 2) + (innerBorder * 2), innerBorder);
    
    ctx.strokeStyle = "#654321";
    ctx.lineWidth = 2;
    ctx.strokeRect(borderWidth, borderWidth, width - (borderWidth * 2), height - (borderWidth * 2));
  };
  
  const drawWoodFrame = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const borderWidth = 100;
    
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "#8B4513");
    gradient.addColorStop(0.5, "#A0522D");
    gradient.addColorStop(1, "#8B4513");
    
    ctx.fillStyle = gradient;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 30;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 15;
    
    ctx.fillRect(0, 0, width, borderWidth);
    ctx.fillRect(0, 0, borderWidth, height);
    ctx.fillRect(width - borderWidth, 0, borderWidth, height);
    ctx.fillRect(0, height - borderWidth, width, borderWidth);
    
    ctx.shadowColor = "transparent";
    
    for (let i = 0; i < 20; i++) {
      ctx.strokeStyle = `rgba(101, 67, 33, ${0.1 + Math.random() * 0.2})`;
      ctx.lineWidth = Math.random() * 3 + 1;
      ctx.beginPath();
      ctx.moveTo(borderWidth / 2, Math.random() * height);
      ctx.lineTo(borderWidth / 2, Math.random() * height);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(width - borderWidth / 2, Math.random() * height);
      ctx.lineTo(width - borderWidth / 2, Math.random() * height);
      ctx.stroke();
    }
    
    ctx.strokeStyle = "#654321";
    ctx.lineWidth = 3;
    ctx.strokeRect(borderWidth, borderWidth, width - (borderWidth * 2), height - (borderWidth * 2));
    
    ctx.strokeStyle = "#D2691E";
    ctx.lineWidth = 1;
    ctx.strokeRect(borderWidth + 5, borderWidth + 5, width - (borderWidth * 2) - 10, height - (borderWidth * 2) - 10);
  };