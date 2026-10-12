/* 星舰科普页 — 自算脚本（页面中标注「自算」的数字都由本文件复算）
 * 运行：node assets/compute.js
 * 依赖：无。所有常量与《附录 B》口径一致。
 */
'use strict';

const G = 6.674e-11;        // 万有引力常数
const M = 5.972e24;         // 地球质量 kg
const Re = 6.371e6;         // 地球平均半径 m
const ve = 3200;            // 猛禽海平面排气速度 m/s（Isp≈327 s × 9.8，社群整理口径）
const raptor3 = 250;        // 猛禽 3 海平面推力（吨力）
const boosterEngines = 33;
const liftoffMass = 5000;   // 吨

const orbitalSpeed = (alt) => Math.sqrt(G * M / (Re + alt));
const kmh = (v) => v * 3.6;

console.log('=== 1. 轨道速度（v = sqrt(GM/r)） ===');
for (const alt of [275e3, 400e3, 100e3]) {
  const v = orbitalSpeed(alt);
  console.log(`高度 ${(alt / 1000).toFixed(0)} km → ${v.toFixed(1)} m/s = ${(v / 1000).toFixed(2)} km/s`);
}
const v275 = orbitalSpeed(275e3);
console.log(`页面采用：275 km → ${(v275 / 1000).toFixed(2)} km/s（写成 7.7 km/s）`);

console.log('\n=== 2. 动能与「烧水」对照 ===');
const KE = 0.5 * v275 * v275;               // J/kg
const water = 4186 * 100;                    // 1kg 水 0→100℃
console.log(`每公斤入轨动能 = ${(KE / 1e6).toFixed(1)} MJ`);
console.log(`烧开 1 kg 水 = ${(water / 1e3).toFixed(0)} kJ`);
console.log(`比值 = ${(KE / water).toFixed(1)} kg 水`);

console.log('\n=== 3. 速度换算 ===');
console.log(`子弹 850 m/s 的倍数 = ${(v275 / 850).toFixed(1)}`);
console.log(`音速 340 m/s 的倍数 = ${(v275 / 340).toFixed(1)}`);
console.log(`折合时速 = ${kmh(v275).toFixed(0)} km/h`);

console.log('\n=== 4. 推重比 ===');
const totalTf = raptor3 * boosterEngines;
console.log(`33 × ${raptor3} = ${totalTf} 吨力 = ${(totalTf * 1000 * 9.80665 / 1e6).toFixed(1)} MN`);
console.log(`推重比 = ${totalTf} / ${liftoffMass} = ${(totalTf / liftoffMass).toFixed(2)}`);

console.log('\n=== 5. 单级入轨需要多少燃料（简化模型） ===');
const need = Math.exp(v275 / ve);            // 质量比
const frac = 1 - 1 / need;
console.log(`需要的质量比 m0/mf = e^(7744/3200) = ${need.toFixed(2)}`);
console.log(`对应燃料占比 = ${(frac * 100).toFixed(1)}%（这就是「单级入轨几乎做不到」的由来）`);
console.log(`燃料占 90% 时的 Δv = ${(ve * Math.log(10)).toFixed(0)} m/s`);

console.log('\n=== 6. 放大规律 ===');
for (const s of [1, 2, 3]) {
  console.log(`尺度 ×${s}：面积 ×${s * s}，体积 ×${s ** 3}，面积/体积 = ${(s * s / s ** 3).toFixed(2)}`);
}

console.log('\n=== 7. 高度类比 ===');
console.log(`124.4 m ≈ ${(124.4 / 3.3).toFixed(1)} 层楼（按 3.3 m/层）`);
console.log(`9 m 直径 ≈ ${(9 / 1.8).toFixed(1)} 个成年人身高（1.8 m）`);
