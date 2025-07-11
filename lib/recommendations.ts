// Contains device-specific data, including safety thresholds and tips.
export const deviceRecommendations = {
  manual: {
    maxDiff: 25,
    minDiff: 15,
    tips: {
      en: ["Requires more attention to brake hand", "Consider using in guide mode", "Practice dynamic belaying"],
      ms: ["Memerlukan lebih perhatian pada tangan brek", "Pertimbang guna dalam mod panduan", "Latih belay dinamik"],
      zh: ["需要更多注意制动手", "考虑使用指导模式", "练习动态确保"]
    }
  },
  assistedPassive: {
    maxDiff: 35,
    minDiff: 10,
    tips: {
      en: ["Assisted braking device", "Good for weight differences", "Learn proper feeding technique"],
      ms: ["Peranti brek berbantu", "Baik untuk perbezaan berat", "Pelajari teknik suapan yang betul"],
      zh: ["辅助制动装置", "适合体重差异", "学习正确的送绳技巧"]
    }
  },
  assistedActive: {
    maxDiff: 40,
    minDiff: 10,
    tips: {
      en: ["Always test the brake position", "Practice proper hand placement", "Never let go of the brake hand"],
      ms: ["Sentiasa uji kedudukan brek", "Latih penempatan tangan yang betul", "Jangan lepaskan tangan brek"],
      zh: ["始终测试制动位置", "练习正确的手部放置", "永远不要松开制动手"]
    }
  }
};

// Defines the available belay devices as a TypeScript type.
export type Device = keyof typeof deviceRecommendations | ''; 