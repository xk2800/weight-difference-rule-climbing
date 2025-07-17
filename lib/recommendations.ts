// Contains device-specific data, including safety thresholds and tips.
export const deviceRecommendations = {
  manual: {
    maxDiff: 25,
    minDiff: 15,
    maxDiffWithOhm: 40, // Higher tolerance with Ohm
    minDiffWithOhm: 15,
    tips: {
      en: ["Requires more attention to brake hand", "Consider using in guide mode", "Practice dynamic belaying", "Ohm can help with weight differences"],
      ms: ["Memerlukan lebih perhatian pada tangan brek", "Pertimbang guna dalam mod panduan", "Latih belay dinamik", "Ohm boleh membantu dengan perbezaan berat"],
      zh: ["需要更多注意制动手", "考虑使用指导模式", "练习动态确保", "Ohm 可以帮助处理体重差异"]
    }
  },
  assistedPassive: {
    maxDiff: 35,
    minDiff: 10,
    maxDiffWithOhm: 50, // Higher tolerance with Ohm
    minDiffWithOhm: 10,
    tips: {
      en: ["Assisted braking device", "Good for weight differences", "Learn proper feeding technique", "Ohm provides additional assistance"],
      ms: ["Peranti brek berbantu", "Baik untuk perbezaan berat", "Pelajari teknik suapan yang betul", "Ohm memberikan bantuan tambahan"],
      zh: ["辅助制动装置", "适合体重差异", "学习正确的送绳技巧", "Ohm 提供额外的帮助"]
    }
  },
  assistedActive: {
    maxDiff: 40,
    minDiff: 10,
    maxDiffWithOhm: 55, // Higher tolerance with Ohm
    minDiffWithOhm: 10,
    tips: {
      en: ["Always test the brake position", "Practice proper hand placement", "Never let go of the brake hand", "Ohm enhances safety for weight differences"],
      ms: ["Sentiasa uji kedudukan brek", "Latih penempatan tangan yang betul", "Jangan lepaskan tangan brek", "Ohm meningkatkan keselamatan untuk perbezaan berat"],
      zh: ["始终测试制动位置", "练习正确的手部放置", "永远不要松开制动手", "Ohm 增强体重差异的安全性"]
    }
  }
};

// Defines the available belay devices as a TypeScript type.
export type Device = keyof typeof deviceRecommendations | '';