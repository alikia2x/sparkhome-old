export function normalizeURL(input: string): string {
    try {
      // 尝试创建URL对象
      const url = new URL(input);

      // 如果成功创建URL对象，则返回标准的URL字符串
      return url.href;
    } catch (error) {
      // 如果创建URL对象失败，则可能是因为缺少协议（例如，缺少http://或https://）
      // 在这种情况下，手动添加协议并再次尝试创建URL对象
      const withHTTP = "http://" + input;
      try {
        const urlWithHTTP = new URL(withHTTP);
        return urlWithHTTP.href;
      } catch (error) {
        // 如果添加协议后仍然失败，则可能是因为输入无效，返回原始输入
        console.error("Invalid URL:", input);
        return input;
      }
    }
}