import { useEffect, useState } from 'react';

import { ArrowUpRight, CheckCircle2, ChevronDown, Code2, LayoutTemplate, MonitorSmartphone, Palette, Sparkles, Play, Heart, MessageCircle, Share2, Smartphone, BarChart3, Target, MousePointer2, PenTool, Layers, Film, Send, TrendingUp, Compass, Megaphone, Check, Type, Image as ImageIcon, Zap, Search, Instagram } from 'lucide-react';

import { services, type Service } from '../data/siteData';

import { supabase } from '../lib/supabase';

import CTA from '../components/shared/CTA';
import { useSEO } from '../hooks/useSEO';



const servicePageStyles = "/* SOLIFYHUB — shared styling for all 12 service pages */\n.sh-service-page{overflow:hidden;color:#07194E}.sh-service-page *{box-sizing:border-box}.sh-hero{background:#F5F4FF;padding:95px 0 85px}.sh-hero-grid{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:7%;min-height:390px}.sh-hero-copy{animation:sh-enter .8s ease both}.sh-hero-copy h1{font-size:clamp(3.3rem,6vw,6rem);font-weight:800;letter-spacing:-.065em;line-height:1.07;margin:30px 0}.sh-hero-tagline{font-size:clamp(1.1rem,1.5vw,1.5rem);color:#505050}.sh-visual{position:relative;aspect-ratio:1.6;overflow:hidden;border-radius:35px;isolation:isolate;box-shadow:0 20px 60px #07194E14;animation:sh-enter .9s .12s ease both}.sh-visual img{width:100%;height:100%;object-fit:cover;transition:transform .8s ease,filter .8s ease}.sh-visual:hover img{transform:scale(1.09);filter:saturate(1.2)}.sh-visual-overlay{position:absolute;inset:0;background:linear-gradient(135deg,transparent 30%,#07194E90);transition:opacity .4s}.sh-visual:hover .sh-visual-overlay{opacity:.85}.sh-visual-symbol{position:absolute;top:25px;right:25px;background:#ffffffdc;color:#1254F4;padding:17px;border-radius:20px;animation:sh-float 4s ease-in-out infinite}.sh-visual-label{position:absolute;bottom:23px;left:25px;display:flex;align-items:center;gap:10px;padding:12px 17px;background:#fff;border-radius:100px;color:#07194E;font-weight:700;box-shadow:0 10px 35px #07194E2b}.sh-pulse{display:inline-block;width:8px;height:8px;border-radius:50%;background:#00CFFF;box-shadow:0 0 0 0 #00CFFF88;animation:sh-pulse 2s infinite}.sh-intro-grid{display:grid;grid-template-columns:.8fr 1.2fr;gap:5rem}.sh-offer-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}.sh-offer-card{position:relative;min-height:245px;padding:30px;border-radius:24px;background:#F5F4FF;transition:background .35s,transform .35s,box-shadow .35s;color:#07194E;overflow:hidden}.sh-offer-card:hover{background:#1254F4;color:#fff;transform:translateY(-8px);box-shadow:0 18px 40px #1254F42c}.sh-card-number{font-weight:800;color:#00CFFF}.sh-card-icon{position:absolute;right:26px;top:25px;color:#1254F4;transition:transform .35s,color .35s}.sh-offer-card:hover .sh-card-icon{color:#00CFFF;transform:rotate(-10deg) scale(1.2)}.sh-offer-card h3{font-size:1.15rem;font-weight:750;margin:65px 0 10px}.sh-offer-card p{font-size:.94rem;line-height:1.7;color:#505050;transition:color .35s}.sh-offer-card:hover p{color:#e1eaff}.sh-card-arrow{position:absolute;bottom:20px;right:23px;opacity:0;transform:translate(-6px,6px);transition:.3s}.sh-offer-card:hover .sh-card-arrow{opacity:1;transform:none}.sh-benefits{background:#F5F4FF}.sh-benefit-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:48px}.sh-benefit-card{border:1px solid #D9E2F0;background:#fff;border-radius:22px;padding:30px;min-height:265px;transition:background .35s,color .35s,transform .35s,box-shadow .35s}.sh-benefit-card svg{color:#1254F4;transition:color .35s,transform .35s}.sh-benefit-card h3{font-size:1.3rem;font-weight:750;margin:55px 0 15px}.sh-benefit-card p{color:#505050;line-height:1.75;transition:color .35s}.sh-benefit-card:hover{background:#1254F4;color:#fff;transform:translateY(-8px);box-shadow:0 18px 40px #1254F425}.sh-benefit-card:hover svg{color:#00CFFF;transform:scale(1.17)}.sh-benefit-card:hover p{color:#e1eaff}.sh-process{background:#07194E;color:#fff}.sh-process-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:50px}.sh-process-step{position:relative;padding:28px 12px 25px 0;border-top:1px solid #ffffff38;transition:transform .35s}.sh-process-step:before{content:'';position:absolute;top:-2px;left:0;width:0;height:3px;background:#00CFFF;transition:width .5s}.sh-process-step:hover:before{width:100%}.sh-process-step:hover{transform:translateY(-7px)}.sh-process-step>span{color:#00CFFF;font-weight:800}.sh-process-step h3{font-size:1.5rem;font-weight:750;margin:52px 0 16px}.sh-process-step p{color:#b7c6e6;line-height:1.75}.sh-faq-grid{display:grid;grid-template-columns:.7fr 1.3fr;gap:5rem}.sh-faq-list{display:grid;gap:16px;align-content:start}.sh-faq{border:1px solid #F5F7FA;border-radius:20px;transition:border-color .3s,box-shadow .3s,background .3s;overflow:hidden}.sh-faq:hover,.sh-faq-open{border-color:#91aaf0;background:#F5F4FF;box-shadow:0 10px 25px #1254F40b}.sh-faq>button{width:100%;padding:22px 25px;display:flex;justify-content:space-between;align-items:center;gap:20px;text-align:left;color:#07194E;font-weight:750;background:transparent;cursor:pointer}.sh-faq button svg{flex-shrink:0;color:#1254F4;transition:transform .3s}.sh-faq-open button svg{transform:rotate(180deg)}.sh-faq-answer{padding:0 25px 24px;color:#505050;line-height:1.8}.sh-builder{position:relative;min-height:360px;padding:25px 20px 10px;display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:32px;background:radial-gradient(circle at 85% 20%,#d0e4ff,transparent 55%),linear-gradient(135deg,#e8f1ff,#f9fbff);overflow:hidden}.sh-browser{width:min(100%,530px);background:white;border:1px solid #d4def0;border-radius:16px;box-shadow:0 25px 55px #07194E25;transition:width .55s,height .55s;animation:sh-float 5s ease-in-out infinite;overflow:hidden}.sh-browser-mobile{width:210px}.sh-browser-bar{height:36px;display:flex;align-items:center;justify-content:space-between;gap:6px;padding:0 12px;background:#edf3fc;font-size:10px;color:#505050}.sh-dots{display:flex;gap:4px}.sh-dots i{width:7px;height:7px;border-radius:50%;background:#ff7878}.sh-dots i:nth-child(2){background:#ffcb66}.sh-dots i:nth-child(3){background:#62d6a2}.sh-live{color:#1254F4}.sh-browser-inner{padding:20px}.sh-browser-nav{display:flex;justify-content:space-between;gap:8px;align-items:center;font-size:12px}.sh-browser-nav b{color:#07194E}.sh-browser-nav b span{color:#1254F4}.sh-browser-nav small{font-size:8px;color:#505050}.sh-browser-main{display:grid;grid-template-columns:1.15fr .85fr;gap:12px;align-items:center;margin-top:28px}.sh-browser-main small{font-size:8px;color:#1254F4;font-weight:800}.sh-browser-main h3{font-size:clamp(15px,2vw,26px);line-height:1.15;font-weight:800;letter-spacing:-.04em;margin:10px 0}.sh-browser-main h3 em{color:#1254F4;font-style:normal}.sh-browser-main p{font-size:10px;color:#505050}.sh-browser-cta{display:inline-flex;gap:5px;align-items:center;background:#1254F4;color:#fff;border-radius:12px;padding:8px 12px;margin-top:13px;font-size:10px}.sh-browser-art{position:relative;display:grid;place-items:center;min-height:145px;border-radius:14px;background:linear-gradient(135deg,#1254F4,#00CFFF);color:#fff}.sh-browser-art svg{animation:sh-spin-in 6s ease-in-out infinite}.sh-browser-art span{position:absolute;inset:18px;border:1px solid #ffffff66;border-radius:50%;animation:sh-orbit 8s linear infinite}.sh-browser-lines{display:flex;gap:10px;margin-top:18px}.sh-browser-lines i{height:8px;flex:1;border-radius:8px;background:#e5ecf8;animation:sh-skeleton 2s ease-in-out infinite}.sh-browser-lines i:nth-child(2){animation-delay:.2s}.sh-browser-lines i:nth-child(3){animation-delay:.4s}.sh-browser-mobile .sh-browser-main{grid-template-columns:1fr;margin-top:15px}.sh-browser-mobile .sh-browser-art{min-height:70px}.sh-browser-mobile .sh-browser-nav small{display:none}.sh-builder-badge{display:flex;align-items:center;gap:7px;background:white;color:#1254F4;border-radius:99px;padding:9px 12px;box-shadow:0 10px 30px #07194E18;font-size:11px;font-weight:700;white-space:nowrap}.sh-builder>.sh-builder-badge{position:absolute;top:13px;right:12px;z-index:2}.sh-builder-bottom{display:flex;justify-content:space-between;gap:8px;width:100%;align-items:center;margin-top:18px}.sh-switch{display:flex;background:#fff;padding:4px;border-radius:99px;gap:3px}.sh-switch button{display:flex;align-items:center;gap:4px;font-size:11px;border-radius:99px;padding:7px 10px;cursor:pointer;color:#505050}.sh-switch button[aria-pressed=true]{background:#1254F4;color:#fff}@keyframes sh-enter{from{opacity:0;transform:translateY(25px)}to{opacity:1;transform:none}}@keyframes sh-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}@keyframes sh-pulse{70%{box-shadow:0 0 0 9px #00CFFF00}100%{box-shadow:0 0 0 0 #00CFFF00}}@keyframes sh-spin-in{0%,100%{transform:rotate(-8deg) scale(.96)}50%{transform:rotate(8deg) scale(1.05)}}@keyframes sh-orbit{to{transform:rotate(360deg)}}@keyframes sh-skeleton{50%{opacity:.4}}@media(max-width:1024px){.sh-hero-grid,.sh-intro-grid,.sh-faq-grid{gap:2.5rem}}@media(max-width:760px){.sh-hero{padding:65px 0}.sh-hero-grid,.sh-intro-grid,.sh-faq-grid{grid-template-columns:1fr}.sh-hero-copy h1{font-size:clamp(2.9rem,12vw,4.8rem)}.sh-benefit-grid,.sh-process-grid{grid-template-columns:1fr}.sh-offer-grid{grid-template-columns:1fr 1fr}.sh-benefit-card{min-height:220px}.sh-process-step h3{margin-top:25px}.sh-builder{min-height:310px}}@media(max-width:480px){.sh-offer-grid{grid-template-columns:1fr}.sh-offer-card{min-height:210px}.sh-offer-card h3{margin-top:40px}.sh-browser-inner{padding:13px}.sh-builder-bottom{flex-wrap:wrap;justify-content:center}.sh-builder>.sh-builder-badge{top:8px;right:8px}.sh-browser-main{margin-top:15px}.sh-browser-art{min-height:105px}}@media(prefers-reduced-motion:reduce){.sh-service-page *, .sh-service-page *:before,.sh-service-page *:after{animation:none!important;transition:none!important}}\n\n/* Unique animated service hero illustrations */\n.sh-custom{position:relative;min-height:410px;overflow:hidden;border-radius:30px;padding:19px;background:linear-gradient(135deg,#e6f1ff,#d5e8ff 60%,#f6faff);box-shadow:0 22px 65px #07194E1b;isolation:isolate}\n.sh-custom-orb{position:absolute;border-radius:50%;filter:blur(4px);pointer-events:none;animation:sh-float 6s ease-in-out infinite}.sh-orb-one{width:230px;height:230px;background:#b6d6ff;top:-95px;right:-65px}.sh-orb-two{width:190px;height:190px;background:#00CFFF22;bottom:-80px;left:-80px;animation-delay:-3s}\n.sh-custom-top{position:relative;z-index:1;display:flex;gap:9px;align-items:center;font-size:10px;letter-spacing:.12em;font-weight:800;color:#1254F4}.sh-custom-live{margin-left:auto;color:#008cb5;font-size:9px;letter-spacing:0}\n.sh-custom-workspace{position:relative;z-index:1;display:flex;margin:18px 0 12px;min-height:280px;background:#fff;border:1px solid #c8d9f5;border-radius:17px;overflow:hidden;box-shadow:0 22px 50px #07194E22;animation:sh-custom-appear .75s ease both}\n.sh-custom-sidebar{width:48px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:18px;padding:17px 9px;background:#07194E;color:#00CFFF}.sh-custom-sidebar span{width:17px;height:4px;border-radius:10px;background:#ffffff50}\n.sh-custom-main{flex:1;min-width:0;background:#F5F4FF}.sh-custom-windowbar{height:32px;display:flex;align-items:center;gap:5px;padding:0 12px;border-bottom:1px solid #e4ebf6;color:#7a8ba5;font-size:9px}.sh-custom-windowbar i{width:7px;height:7px;background:#ff8383;border-radius:50%}.sh-custom-windowbar i:nth-child(2){background:#ffd270}.sh-custom-windowbar i:nth-child(3){background:#5dd2aa}.sh-custom-windowbar span{margin-left:10px}\n.sh-custom-footer{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:center;gap:12px;color:#07194E}.sh-custom-footer small{display:block;color:#607496;font-size:10px}.sh-custom-footer strong{display:block;font-size:15px;margin-top:3px}.sh-custom-chips{display:flex;flex-wrap:wrap;gap:4px;justify-content:flex-end}.sh-custom-chips button{background:#fff;border:1px solid #c9d8f2;border-radius:20px;padding:6px 9px;color:#1254F4;font-size:10px;cursor:pointer;transition:.25s}.sh-custom-chips button[aria-pressed=true],.sh-custom-chips button:hover{background:#1254F4;color:#fff}\n.sh-brand-scene,.sh-design-scene,.sh-analytics-scene,.sh-video-scene,.sh-social-scene,.sh-content-scene,.sh-motion-scene,.sh-strategy-scene,.sh-app-scene{position:relative;min-height:247px;padding:18px;overflow:hidden}\n.sh-brand-scene{display:flex;align-items:center;justify-content:center;gap:20px}.sh-brand-card{width:62%;max-width:225px;min-height:190px;border-radius:12px;background:linear-gradient(135deg,#07194E,#1254F4);color:#fff;padding:20px;box-shadow:14px 14px 0 #b9d1fb;animation:sh-float 5s ease-in-out infinite}.sh-brand-mark{font-size:40px;font-weight:900}.sh-brand-mark span{color:#00CFFF}.sh-brand-card strong{display:block;line-height:1.1;margin:12px 0;font-size:17px}.sh-brand-card small{font-size:8px;letter-spacing:.1em}.sh-brand-palette{display:grid;gap:9px}.sh-brand-palette span{width:33px;height:33px;border-radius:9px;background:#07194E;animation:sh-palette 4s ease-in-out infinite}.sh-brand-palette span:nth-child(2){background:#1254F4;animation-delay:.3s}.sh-brand-palette span:nth-child(3){background:#00CFFF;animation-delay:.6s}.sh-brand-palette span:nth-child(4){background:#e4efff;animation-delay:.9s}.sh-brand-stamp{position:absolute;bottom:12px;right:12px;background:#fff;padding:8px 10px;border-radius:15px;font-size:10px;color:#1254F4;display:flex;gap:5px;align-items:center;box-shadow:0 5px 20px #07194E20}\n.sh-design-tools{display:flex;gap:12px;color:#1254F4}.sh-design-canvas{position:relative;width:85%;height:180px;margin:5px auto;background:#fff;border:1px dashed #8db2ec;box-shadow:0 10px 30px #07194E18;display:flex;align-items:center;justify-content:center;overflow:hidden}.sh-design-circle{position:absolute;width:120px;height:120px;border-radius:50%;background:#00CFFF;left:15px;top:10px;animation:sh-design-spin 7s linear infinite}.sh-design-square{position:absolute;width:120px;height:120px;background:#1254F4;right:8px;bottom:-40px;transform:rotate(30deg);animation:sh-shape-shift 5s ease-in-out infinite}.sh-design-canvas strong{position:relative;z-index:1;text-align:center;color:#07194E;font-size:24px;line-height:1;letter-spacing:-.05em;text-shadow:1px 1px #fff}.sh-design-pointer{position:absolute;right:24px;top:25px;color:#07194E;animation:sh-pointer 4s ease-in-out infinite}\n.sh-analytics-header{display:flex;justify-content:space-between;align-items:center;color:#1254F4;font-weight:800;font-size:12px}.sh-analytics-metrics{display:flex;gap:10px;margin:18px 0}.sh-analytics-metrics div{flex:1;padding:11px;border-radius:10px;background:#fff;border:1px solid #e2eaf7}.sh-analytics-metrics small{display:block;font-size:10px;color:#505050}.sh-analytics-metrics strong{font-size:21px;color:#07194E}.sh-analytics-bars{height:105px;display:flex;align-items:flex-end;gap:9px;border-bottom:1px solid #cbdaf3}.sh-analytics-bars div{flex:1;min-width:0;background:linear-gradient(0deg,#1254F4,#00CFFF);border-radius:5px 5px 0 0;transform-origin:bottom;animation:sh-bar-rise 2.5s ease-in-out infinite alternate}.sh-analytics-foot{display:flex;gap:5px;align-items:center;margin-top:8px;color:#1254F4;font-size:10px}\n.sh-video-screen{height:154px;background:linear-gradient(130deg,#07194E,#1254F4 65%,#00CFFF);border-radius:12px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}.sh-video-screen:before{content:'';position:absolute;width:180px;height:180px;border:2px solid #ffffff44;border-radius:50%;animation:sh-orbit 8s linear infinite}.sh-video-play{width:62px;height:62px;border-radius:50%;background:#ffffffdd;color:#1254F4;display:grid;place-items:center;animation:sh-play-pulse 2s ease-in-out infinite}.sh-video-screen>span{position:absolute;bottom:10px;left:10px;color:#fff;font-size:9px;letter-spacing:.08em}.sh-video-timeline{display:flex;gap:4px;margin-top:15px;height:40px}.sh-video-timeline div{flex:1;background:repeating-linear-gradient(90deg,#1254F4 0 10px,#4a8fe4 10px 14px);border-radius:4px;opacity:.8}.sh-video-timeline div:nth-child(even){background:repeating-linear-gradient(90deg,#00CFFF 0 7px,#b8e9f6 7px 10px)}.sh-video-scrubber{width:2px;height:54px;background:#ff8b54;position:absolute;bottom:15px;left:15%;animation:sh-scrub 5s linear infinite}\n.sh-social-scene{display:grid;place-items:center}.sh-social-post{width:min(230px,85%);background:#fff;border:1px solid #e1e8f4;border-radius:12px;overflow:hidden;box-shadow:0 12px 25px #07194E18;animation:sh-float 5s ease-in-out infinite}.sh-social-account{display:flex;gap:6px;align-items:center;padding:9px;font-size:10px;font-weight:800;color:#07194E}.sh-social-account span{margin-left:auto}.sh-social-art{min-height:115px;background:linear-gradient(135deg,#1254F4,#07194E);color:#fff;display:flex;align-items:center;justify-content:center;gap:12px}.sh-social-art svg{color:#00CFFF;animation:sh-shape-shift 4s ease-in-out infinite}.sh-social-art strong{font-size:21px;line-height:1.05}.sh-social-actions{display:flex;align-items:center;gap:11px;padding:10px;color:#1254F4}.sh-social-actions span{margin-left:auto}.sh-social-float{position:absolute;right:7px;top:35px;background:#fff;color:#1254F4;padding:8px 10px;border-radius:20px;font-size:12px;font-weight:800;box-shadow:0 8px 25px #07194E20;animation:sh-float 3s ease-in-out infinite}\n.sh-content-toolbar{display:flex;gap:8px;align-items:center;font-size:12px;color:#1254F4;border-bottom:1px solid #dce7f8;padding-bottom:10px}.sh-content-toolbar span{margin-left:auto;color:#008c7a;font-size:10px}.sh-content-type{display:block;font-size:clamp(18px,3vw,26px);color:#07194E;white-space:nowrap;overflow:hidden;width:0;max-width:100%;border-right:2px solid #00CFFF;animation:sh-typing 5s steps(23,end) infinite;margin:20px 0}.sh-content-line{height:9px;background:#d6e4f8;border-radius:9px;margin:13px 0;width:92%}.sh-content-line.short{width:65%}.sh-content-cursor{height:3px;width:40%;background:#00CFFF;animation:sh-skeleton 2s infinite}.sh-content-tag{position:absolute;right:14px;bottom:14px;display:flex;align-items:center;gap:6px;background:#e5efff;color:#1254F4;border-radius:15px;padding:7px 10px;font-size:10px}\n.sh-motion-scene{display:grid;place-items:center}.sh-motion-shape{position:absolute;width:92px;height:92px;border-radius:20px;animation:sh-shape-shift 5s ease-in-out infinite}.sh-motion-shape.one{background:#1254F4;left:20%;top:18%;transform:rotate(20deg)}.sh-motion-shape.two{background:#00CFFF;right:18%;top:20%;border-radius:50%;animation-delay:-1.5s}.sh-motion-shape.three{background:#07194E;bottom:16%;left:41%;transform:rotate(40deg);animation-delay:-3s}.sh-motion-center{position:relative;z-index:2;width:74px;height:74px;border-radius:50%;display:grid;place-items:center;background:#fff;color:#1254F4;box-shadow:0 8px 30px #07194E30}.sh-motion-track{position:absolute;bottom:12px;display:flex;gap:9px}.sh-motion-track span{height:5px;width:30px;background:#1254F4;border-radius:8px;animation:sh-skeleton 1s infinite}.sh-motion-track span:nth-child(2){animation-delay:.2s}.sh-motion-track span:nth-child(3){animation-delay:.4s}\n.sh-strategy-scene{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:15px}.sh-strategy-node{display:flex;gap:8px;align-items:center;border-radius:15px;background:#1254F4;color:#fff;padding:17px 22px;box-shadow:0 10px 30px #1254F440;animation:sh-float 4s ease-in-out infinite}.sh-strategy-links{height:38px;display:flex;gap:65px;justify-content:center}.sh-strategy-links i{height:100%;width:2px;background:#00CFFF;transform-origin:top;animation:sh-bar-rise 2s ease-in-out infinite alternate}.sh-strategy-nodes{display:flex;gap:7px;justify-content:center;flex-wrap:wrap}.sh-strategy-nodes span{display:flex;gap:5px;align-items:center;background:#fff;color:#1254F4;border:1px solid #d8e6fb;border-radius:12px;padding:10px 9px;font-size:10px;box-shadow:0 8px 20px #07194E11}\n.sh-app-scene{display:flex;align-items:center;justify-content:center;gap:15px}.sh-app-phone{width:145px;height:226px;border:5px solid #07194E;border-radius:24px;background:#fff;position:relative;overflow:hidden;box-shadow:8px 10px 25px #07194E25;animation:sh-float 5s ease-in-out infinite}.sh-app-notch{height:11px;width:55px;background:#07194E;border-radius:0 0 10px 10px;margin:auto}.sh-app-header{padding:12px 10px;font-size:10px;font-weight:800;color:#07194E}.sh-app-feature{margin:0 9px;background:linear-gradient(130deg,#1254F4,#00CFFF);border-radius:12px;color:#fff;min-height:84px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px}.sh-app-feature b{font-size:12px}.sh-app-feature small{font-size:8px}.sh-app-tiles{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:10px}.sh-app-tiles i{height:18px;background:#e3edfc;border-radius:5px}.sh-app-nav{position:absolute;bottom:5px;left:0;right:0;text-align:center;color:#1254F4;font-size:11px}.sh-app-code{display:flex;flex-direction:column;gap:10px;max-width:45%;background:#07194E;color:#bceaff;padding:12px;border-radius:10px;box-shadow:0 10px 30px #07194E29;animation:sh-float 5s -2s ease-in-out infinite}.sh-app-code code{font-size:10px;white-space:nowrap}.sh-app-code span{color:#67edb6;font-size:8px}\n@keyframes sh-custom-appear{from{opacity:0;transform:translateY(20px) scale(.97)}to{opacity:1;transform:none}}@keyframes sh-palette{50%{transform:translateX(8px) scale(1.1)}}@keyframes sh-design-spin{50%{transform:rotate(160deg) scale(1.2)}}@keyframes sh-shape-shift{50%{transform:translate(14px,-18px) rotate(70deg) scale(1.1)}}@keyframes sh-pointer{50%{transform:translate(-65px,80px)}}@keyframes sh-bar-rise{from{transform:scaleY(.35)}to{transform:scaleY(1)}}@keyframes sh-play-pulse{50%{transform:scale(1.15);box-shadow:0 0 0 14px #ffffff33}}@keyframes sh-scrub{from{left:15%}to{left:90%}}@keyframes sh-typing{0%{width:0}50%,80%{width:100%}100%{width:0}}\n@media(max-width:480px){.sh-custom{padding:12px;min-height:380px}.sh-custom-workspace{min-height:265px}.sh-custom-sidebar{width:35px}.sh-custom-footer{flex-direction:column;align-items:flex-start}.sh-custom-chips{justify-content:flex-start}.sh-app-code{max-width:45%;padding:7px}.sh-app-code code{font-size:8px}.sh-custom-live{font-size:8px}}\n@media(prefers-reduced-motion:reduce){.sh-custom *,.sh-custom *:before,.sh-custom *:after{animation:none!important;transition:none!important}.sh-content-type{width:auto;border:0}}\n\n/* Interactive tab-specific visual scenes */\n.sh-tab-scene{min-height:265px;padding:18px;display:flex;flex-direction:column;justify-content:space-between;animation:sh-custom-appear .4s ease both}\n.sh-tab-stage{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;min-height:202px;text-align:center}\n.sh-tab-eyebrow{font-size:10px;letter-spacing:.14em;font-weight:800;color:#1254F4}\n.sh-tab-symbol{width:76px;height:76px;border-radius:22px;display:grid;place-items:center;font-size:35px;font-weight:900;color:#fff;background:linear-gradient(135deg,#07194E,#1254F4,#00CFFF);box-shadow:0 14px 35px #1254F43b;animation:sh-float 3.5s ease-in-out infinite}\n.sh-tab-symbol-motion{border-radius:50%;animation:sh-orbit 7s linear infinite}\n.sh-tab-title{font-size:clamp(19px,2.8vw,29px);font-weight:850;letter-spacing:-.04em;color:#07194E}\n.sh-tab-palette{display:flex;gap:6px;justify-content:center}.sh-tab-palette span{width:25px;height:25px;border-radius:7px;border:2px solid white;box-shadow:0 3px 10px #07194E20;animation:sh-custom-appear .5s ease both}\n.sh-tab-description{font-size:12px;line-height:1.5;color:#505050;max-width:310px}\n.sh-tab-stats{display:flex;justify-content:center;gap:6px;flex-wrap:wrap}.sh-tab-stats span{background:#eaf2ff;color:#1254F4;padding:7px 9px;border-radius:9px;font-size:10px;font-weight:700;animation:sh-custom-appear .4s ease both}\n.sh-custom-chips button{transition:background .25s,color .25s,transform .25s}.sh-custom-chips button:hover{transform:translateY(-2px)}.sh-custom-chips button:focus-visible{outline:3px solid #00CFFF;outline-offset:3px}\n@media(prefers-reduced-motion:reduce){.sh-tab-scene,.sh-tab-symbol,.sh-tab-stats span,.sh-tab-palette span{animation:none!important}}\n";



const uniformNavyHoverStyles = '/* Navy hover only on non-FAQ cards */\n.sh-service-page { --sh-hover-navy: #07194E; }\n.sh-service-page .sh-offer-card,\n.sh-service-page .sh-benefit-card,\n.sh-service-page .sh-process-step {\n  transition: background-color .38s ease, border-color .38s ease, color .38s ease, transform .38s ease, box-shadow .38s ease;\n}\n.sh-service-page .sh-offer-card:hover,\n.sh-service-page .sh-benefit-card:hover {\n  background: var(--sh-hover-navy) !important;\n  border-color: var(--sh-hover-navy) !important;\n  color: #fff !important;\n  box-shadow: 0 20px 42px rgba(7,25,78,.22);\n  transform: translateY(-8px);\n}\n.sh-service-page .sh-offer-card:hover h3,\n.sh-service-page .sh-offer-card:hover p,\n.sh-service-page .sh-benefit-card:hover h3,\n.sh-service-page .sh-benefit-card:hover p { color: #fff !important; }\n.sh-service-page .sh-offer-card:hover .sh-card-number,\n.sh-service-page .sh-offer-card:hover .sh-card-icon,\n.sh-service-page .sh-offer-card:hover .sh-card-arrow,\n.sh-service-page .sh-benefit-card:hover svg { color: #8feaff !important; }\n.sh-service-page .sh-process-step:hover {\n  background: var(--sh-hover-navy);\n  border-color: #8feaff;\n  box-shadow: 0 15px 30px rgba(0,0,0,.15);\n}\n.sh-service-page .sh-process-step:hover h3,\n.sh-service-page .sh-process-step:hover p { color: #fff !important; }\n.sh-service-page .sh-process-step:hover > span { color: #8feaff; }\n.sh-service-page .sh-custom-chips button:hover,\n.sh-service-page .sh-tab-stats span:hover,\n.sh-service-page .sh-strategy-nodes span:hover,\n.sh-service-page .sh-brand-stamp:hover,\n.sh-service-page .sh-builder-badge:hover {\n  background: #07194E !important;\n  color: #fff !important;\n  border-color: #07194E !important;\n  box-shadow: 0 10px 25px rgba(7,25,78,.2);\n}\n.sh-service-page .sh-tab-stats span,\n.sh-service-page .sh-strategy-nodes span,\n.sh-service-page .sh-brand-stamp,\n.sh-service-page .sh-builder-badge { transition: background-color .35s, color .35s, box-shadow .35s; }\n@media (prefers-reduced-motion: reduce) {\n  .sh-service-page .sh-offer-card,\n  .sh-service-page .sh-benefit-card,\n  .sh-service-page .sh-process-step { transition: none !important; }\n}\n';

type ServiceContent = { heading:string; intro:string; offerDescriptions:string[]; benefitTitles:string[]; benefitDescriptions:string[]; processTitles:string[]; processDescriptions:string[] };

const serviceContent: Record<string, ServiceContent> = {

  "branding": {

    "heading": "Identity that lasts.",

    "intro": "Build recognition, trust and a brand people remember.",

    "offerDescriptions": [

      "Audience research and positioning that makes your brand distinctive.",

      "Logos, typography and color systems that work everywhere.",

      "Practical guidelines that keep your brand consistent.",
      "Define a distinctive brand voice and key messages that connect with your audience."


    ],

    "benefitTitles": [

      "A recognizable identity",

      "Consistency across channels",

      "Confidence in every interaction"

    ],

    "benefitDescriptions": [

      "A cohesive brand helps people identify and remember your business.",

      "A consistent system makes every channel feel connected.",

      "Clear messaging helps your team communicate with confidence."

    ],

    "processTitles": [

      "Discover",

      "Design",

      "Deliver"

    ],

    "processDescriptions": [

      "Understand your audience, competitors and brand ambitions.",

      "Create identity concepts and refine the strongest direction.",

      "Package your assets and guidelines for consistent rollout."

    ]

  },

  "graphic-design": {

    "heading": "Design with purpose.",

    "intro": "Make every visual touchpoint clearer, sharper and more memorable.",

    "offerDescriptions": [

      "Campaign visuals designed around your message and audience.",

      "Digital and print assets aligned with your brand identity.",

      "Clear presentation layouts that make information easy to follow.",
      "Create branded social posts and digital visuals that stay consistent across platforms."


    ],

    "benefitTitles": [

      "Stronger visual impact",

      "Consistent brand presence",

      "Clearer communication"

    ],

    "benefitDescriptions": [

      "Stand out in crowded feeds and marketing spaces.",

      "Keep a unified look across online and offline materials.",

      "Help your audience understand your message at a glance."

    ],

    "processTitles": [

      "Brief",

      "Create",

      "Refine"

    ],

    "processDescriptions": [

      "Define goals, format and creative direction.",

      "Design purposeful layouts and visual concepts.",

      "Review feedback and prepare final production-ready files."

    ]

  },

  "advertising": {

    "heading": "Ideas worth noticing.",

    "intro": "Build campaigns that turn attention into meaningful action.",

    "offerDescriptions": [

      "Memorable campaign ideas rooted in customer insight.",

      "Creative assets adapted for relevant digital placements.",

      "A unified creative direction across campaign touchpoints.",
      "Review creative performance and refine messaging to improve campaign effectiveness."


    ],

    "benefitTitles": [

      "Better message recall",

      "More relevant engagement",

      "Clearer campaign direction"

    ],

    "benefitDescriptions": [

      "Distinctive creative helps your message stay memorable.",

      "Audience-focused messaging supports meaningful responses.",

      "Consistent concepts keep each placement connected."

    ],

    "processTitles": [

      "Research",

      "Concept",

      "Activate"

    ],

    "processDescriptions": [

      "Identify the audience, offer and campaign objective.",

      "Develop and test creative directions and messages.",

      "Launch approved assets and refine from performance signals."

    ]

  },

  "video-production": {

    "heading": "Stories that move.",

    "intro": "Create video that people watch, remember and respond to.",

    "offerDescriptions": [

      "Brand stories shaped for clarity and emotional impact.",

      "Short-form edits tailored for social platforms.",

      "Product and campaign videos that highlight real value.",
      "Polish footage with editing, color grading, sound design and final exports."


    ],

    "benefitTitles": [

      "Memorable storytelling",

      "More engaging content",

      "Versatile brand assets"

    ],

    "benefitDescriptions": [

      "Show your brand personality through compelling visuals.",

      "Communicate complex ideas in an accessible format.",

      "Repurpose footage across campaigns and channels."

    ],

    "processTitles": [

      "Plan",

      "Produce",

      "Polish"

    ],

    "processDescriptions": [

      "Develop the brief, concept and shot plan.",

      "Capture visuals, sound and voice-over as needed.",

      "Edit, color-grade and deliver platform-ready versions."

    ]

  },

  "social-media-creatives": {

    "heading": "Creative that stops the scroll.",

    "intro": "Give your social presence a distinctive and consistent voice.",

    "offerDescriptions": [

      "Connected social concepts for recurring campaigns.",

      "Purposeful carousel and static post designs.",

      "Short-form visuals designed for attention and clarity.",
      "Build reusable post and story templates for a recognizable social media presence."


    ],

    "benefitTitles": [

      "Recognizable social identity",

      "Stronger content consistency",

      "More compelling messages"

    ],

    "benefitDescriptions": [

      "Make your posts immediately recognizable to followers.",

      "Maintain quality across a busy publishing calendar.",

      "Communicate each offer with creative purpose."

    ],

    "processTitles": [

      "Plan",

      "Design",

      "Adapt"

    ],

    "processDescriptions": [

      "Define audience, themes and content objectives.",

      "Create reusable visual systems and post concepts.",

      "Adapt and optimize creative for each platform."

    ]

  },

  "content-creation": {

    "heading": "Words with a point of view.",

    "intro": "Turn ideas into content your audience wants to explore.",

    "offerDescriptions": [

      "Editorial direction informed by audience needs.",

      "Clear copy for websites, campaigns and brand channels.",

      "Useful articles and stories that support discovery.",
      "Develop helpful search-focused articles that answer audience questions."


    ],

    "benefitTitles": [

      "Clearer brand voice",

      "More useful communication",

      "Content with longevity"

    ],

    "benefitDescriptions": [

      "Build a recognizable tone across every touchpoint.",

      "Answer real customer questions with practical information.",

      "Create content that can support long-term visibility."

    ],

    "processTitles": [

      "Listen",

      "Write",

      "Improve"

    ],

    "processDescriptions": [

      "Research customer questions and content opportunities.",

      "Develop the message and produce useful content.",

      "Edit for clarity, relevance and channel fit."

    ]

  },

  "web-design": {

    "heading": "Websites built to move people.",

    "intro": "Design and build websites that feel unmistakably yours.",

    "offerDescriptions": [

      "Intuitive journeys and interface designs focused on usability.",

      "Flexible responsive layouts for phones, tablets and desktops.",

      "Clear calls to action that make the next step easy.",
      "Keep website content, usability and performance up to date as your business grows."


    ],

    "benefitTitles": [

      "Stronger first impressions",

      "A clearer path to action",

      "A scalable digital foundation"

    ],

    "benefitDescriptions": [

      "Create a credible first impression with a polished website.",

      "Guide visitors towards enquiries, bookings or purchases.",

      "Build a flexible experience that grows with your business."

    ],

    "processTitles": [

      "Discover",

      "Design & Build",

      "Optimize"

    ],

    "processDescriptions": [

      "Understand your goals, customers and site requirements.",

      "Create wireframes, visual layouts and responsive pages.",

      "Test usability, improve performance and refine conversion paths."

    ]

  },

  "motion-graphics": {

    "heading": "Bring ideas into motion.",

    "intro": "Add movement and clarity to messages that deserve attention.",

    "offerDescriptions": [

      "Animated brand assets for cohesive visual identity.",

      "Explainers that simplify products, processes and ideas.",

      "Motion-ready formats for social and campaign placements.",
      "Bring brand identities to life with polished logo animations and transitions."


    ],

    "benefitTitles": [

      "More engaging visuals",

      "Simpler explanations",

      "Flexible animated assets"

    ],

    "benefitDescriptions": [

      "Movement draws attention to the details that matter.",

      "Explain complex information with clear visual sequences.",

      "Reuse branded motion across multiple channels."

    ],

    "processTitles": [

      "Storyboard",

      "Animate",

      "Deliver"

    ],

    "processDescriptions": [

      "Turn the brief into a visual sequence and storyboard.",

      "Animate typography, illustrations and graphic elements.",

      "Refine timing, sound and exports for target platforms."

    ]

  },

  "campaigns": {

    "heading": "One idea. Every touchpoint.",

    "intro": "Create connected campaigns with a clear purpose.",

    "offerDescriptions": [

      "Audience and channel plans aligned to the objective.",

      "Integrated assets that tell one consistent story.",

      "Launch kits that support coordinated execution.",
      "Track results across channels and identify opportunities for improvement."


    ],

    "benefitTitles": [

      "Connected messaging",

      "Stronger campaign recall",

      "Simpler coordination"

    ],

    "benefitDescriptions": [

      "Keep the same strategic idea across every placement.",

      "Repetition of clear messaging supports recognition.",

      "Equip teams with a consistent set of campaign assets."

    ],

    "processTitles": [

      "Strategize",

      "Create",

      "Launch"

    ],

    "processDescriptions": [

      "Define the audience, objectives and channel roles.",

      "Build the campaign concept and creative toolkit.",

      "Coordinate launch assets and evaluate performance."

    ]

  },

  "creative-strategy": {

    "heading": "Clarity before creativity.",

    "intro": "Find the direction that makes every idea more effective.",

    "offerDescriptions": [

      "Insights into audience needs and decision drivers.",

      "Creative direction rooted in business objectives.",

      "Messaging frameworks that align your communication.",
      "Align your team around a clear market position and creative direction."


    ],

    "benefitTitles": [

      "Sharper positioning",

      "More focused creative",

      "Better team alignment"

    ],

    "benefitDescriptions": [

      "Understand what makes your business relevant and different.",

      "Give designers and marketers a clear direction.",

      "Make it easier to communicate a consistent message."

    ],

    "processTitles": [

      "Explore",

      "Define",

      "Guide"

    ],

    "processDescriptions": [

      "Review goals, audience insights and current communications.",

      "Define positioning, messaging and creative territories.",

      "Translate the strategy into actionable creative briefs."

    ]

  },

  "digital-marketing": {

    "heading": "Turn attention into action.",

    "intro": "Connect strategy, channels and measurement for growth.",

    "offerDescriptions": [

      "Growth plans based on goals, audience and channel fit.",

      "Search and paid-media campaigns focused on relevant demand.",

      "Analytics and optimization to inform the next decision.",
      "Improve local discoverability with location-focused SEO and business profile optimization."


    ],

    "benefitTitles": [

      "Better online visibility",

      "More qualified opportunities",

      "Clearer performance insights"

    ],

    "benefitDescriptions": [

      "Help relevant audiences discover your business.",

      "Guide interested prospects towards enquiries and sales.",

      "Understand what is working and where to improve."

    ],

    "processTitles": [

      "Audit",

      "Launch",

      "Optimize"

    ],

    "processDescriptions": [

      "Review goals, competitors, channels and tracking.",

      "Build campaigns, content and audience journeys.",

      "Monitor performance and improve based on evidence."

    ]

  },

  "app-development": {

    "heading": "Applications built for people.",

    "intro": "Turn your business idea into a useful digital product.",

    "offerDescriptions": [

      "User-friendly mobile applications for practical workflows.",

      "Responsive web applications with scalable architecture.",

      "APIs and integrations that connect existing systems.",
      "Test functionality, resolve issues and support updates after launch."


    ],

    "benefitTitles": [

      "Smoother user experiences",

      "More efficient operations",

      "Room to scale"

    ],

    "benefitDescriptions": [

      "Make everyday tasks simpler for your customers and team.",

      "Reduce manual steps with connected digital workflows.",

      "Build a maintainable foundation for future features."

    ],

    "processTitles": [

      "Plan",

      "Build",

      "Evolve"

    ],

    "processDescriptions": [

      "Map users, features, technical needs and priorities.",

      "Design interfaces and develop the application in stages.",

      "Test, deploy and plan ongoing enhancements."

    ]

  }

};






const fourthOffer: Record<string, string> = {
  "branding": "Brand messaging",
  "graphic-design": "Social media design",
  "advertising": "Ad performance optimization",
  "video-production": "Video editing & post-production",
  "social-media-creatives": "Branded content templates",
  "content-creation": "SEO blog content",
  "web-design": "Website maintenance & optimization",
  "motion-graphics": "Animated logo reveals",
  "campaigns": "Campaign performance reporting",
  "creative-strategy": "Brand positioning workshops",
  "digital-marketing": "Local SEO & Google Business Profile",
  "app-development": "App testing & maintenance",
};

function WebsiteBuilderPreview() {

  const [mobile, setMobile] = useState(false);

  return <div className="sh-builder" aria-label="Animated website design preview">

    <div className="sh-builder-badge"><Code2 size={15}/> Designing your website <span className="sh-pulse"/></div>

    <div className={`sh-browser ${mobile ? 'sh-browser-mobile' : ''}`}>

      <div className="sh-browser-bar"><span className="sh-dots"><i/><i/><i/></span><span>yourbusiness.com</span><span className="sh-live">● Preview</span></div>

      <div className="sh-browser-inner"><div className="sh-browser-nav"><b>YOUR<span>BRAND</span></b><small>Home　About　Services</small></div>

        <div className="sh-browser-main"><div><small>DIGITAL EXPERIENCES</small><h3>Ideas into<br/><em>experiences.</em></h3><p>Thoughtful design. Real impact.</p><span className="sh-browser-cta">Explore <ArrowUpRight size={13}/></span></div><div className="sh-browser-art"><LayoutTemplate size={48}/><span/></div></div>

        <div className="sh-browser-lines"><i/><i/><i/></div>

      </div>

    </div>

    <div className="sh-builder-bottom"><div className="sh-builder-badge"><Palette size={15}/> UI / UX in progress <Sparkles size={13}/></div><div className="sh-switch"><button type="button" aria-pressed={!mobile} onClick={()=>setMobile(false)}><LayoutTemplate size={15}/> Desktop</button><button type="button" aria-pressed={mobile} onClick={()=>setMobile(true)}><MonitorSmartphone size={15}/> Mobile</button></div></div>

  </div>;

}



type HeroSlug = string;

const heroLabels: Record<string, { eyebrow:string; headline:string; subline:string; chips:string[] }> = {

  branding:{eyebrow:'BRAND IDENTITY SYSTEM',headline:'Made to be remembered.',subline:'Strategy • Identity • Guidelines',chips:['Logo','Palette','Typography']},

  'graphic-design':{eyebrow:'CREATIVE STUDIO',headline:'Design in progress.',subline:'Layers • Layout • Visuals',chips:['Canvas','Shapes','Export']},

  advertising:{eyebrow:'CAMPAIGN MANAGER',headline:'Make every impression count.',subline:'Creative • Targeting • Results',chips:['Reach','Clicks','Impact']},

  'video-production':{eyebrow:'VIDEO EDITOR',headline:'Stories in motion.',subline:'Shoot • Edit • Deliver',chips:['Preview','Timeline','Audio']},

  'social-media-creatives':{eyebrow:'SOCIAL CONTENT STUDIO',headline:'Stop the scroll.',subline:'Create • Publish • Engage',chips:['Posts','Stories','Reels']},

  'content-creation':{eyebrow:'CONTENT WORKSPACE',headline:'Words that connect.',subline:'Research • Write • Refine',chips:['Draft','Review','Publish']},

  'motion-graphics':{eyebrow:'MOTION LAB',headline:'Bring ideas to life.',subline:'Animate • Move • Inspire',chips:['Shapes','Keyframes','Motion']},

  campaigns:{eyebrow:'CAMPAIGN WORKFLOW',headline:'One idea. Every channel.',subline:'Plan • Launch • Measure',chips:['Search','Social','Video']},

  'creative-strategy':{eyebrow:'STRATEGY BOARD',headline:'Insight becomes direction.',subline:'Discover • Define • Create',chips:['Audience','Insight','Idea']},

  'digital-marketing':{eyebrow:'GROWTH DASHBOARD',headline:'Turn attention into action.',subline:'SEO • Ads • Analytics',chips:['Traffic','Leads','Growth']},

  'app-development':{eyebrow:'APP DEVELOPMENT',headline:'Build the next big thing.',subline:'Design • Develop • Deploy',chips:['UI','Code','Launch']},

};





const tabScenes: Record<string, Array<{title:string; eyebrow:string; detail:string; glyph:string; colors:string[]; stats:string[]}>> = {

  branding:[

    {title:'SOLIFYHUB',eyebrow:'LOGO SYSTEM',detail:'A memorable mark built to work everywhere.',glyph:'✦',colors:['#07194E','#1254F4','#00CFFF'],stats:['Primary logo','Symbol','Brand mark']},

    {title:'COLOR PALETTE',eyebrow:'BRAND COLORS',detail:'A consistent visual language across every touchpoint.',glyph:'◈',colors:['#07194E','#1254F4','#00CFFF','#F4F8FF'],stats:['Deep navy','Royal blue','Cyan accent']},

    {title:'Aa Bb Cc',eyebrow:'TYPOGRAPHY SYSTEM',detail:'Distinctive headings and readable body copy.',glyph:'Aa',colors:['#07194E','#1254F4'],stats:['Bold headlines','Body typography','Type hierarchy']}

  ],

  'graphic-design':[

    {title:'CREATIVE CANVAS',eyebrow:'DESIGN COMPOSITION',detail:'Layouts that communicate instantly.',glyph:'▧',colors:['#1254F4','#00CFFF','#07194E'],stats:['Grid layout','Composition','Alignment']},

    {title:'SHAPE STUDY',eyebrow:'VISUAL ELEMENTS',detail:'Experiment with geometry, color and form.',glyph:'◉',colors:['#00CFFF','#1254F4','#A7C9FF'],stats:['Circles','Geometry','Visual balance']},

    {title:'READY TO EXPORT',eyebrow:'FINAL ASSETS',detail:'Campaign artwork prepared for delivery.',glyph:'↗',colors:['#07194E','#00CFFF'],stats:['Social graphics','Print assets','Web-ready']}

  ],

  advertising:[

    {title:'128.4K',eyebrow:'CAMPAIGN REACH',detail:'Creative campaigns built to reach the right audience.',glyph:'◎',colors:['#1254F4','#00CFFF'],stats:['Impressions','Audience','Awareness']},

    {title:'4.8K',eyebrow:'AD INTERACTIONS',detail:'Compelling messaging encourages meaningful clicks.',glyph:'↗',colors:['#07194E','#1254F4'],stats:['Clicks','Engagement','Response']},

    {title:'+42%',eyebrow:'CAMPAIGN IMPACT',detail:'Measure, learn and optimize campaign results.',glyph:'▥',colors:['#1254F4','#00CFFF'],stats:['Conversions','Optimization','Reporting']}

  ],

  'video-production':[

    {title:'SCENE PREVIEW',eyebrow:'VIDEO MONITOR',detail:'Frame the story before the final cut.',glyph:'▶',colors:['#07194E','#1254F4'],stats:['00:12','Full HD','Preview']},

    {title:'EDIT TIMELINE',eyebrow:'POST PRODUCTION',detail:'Cut, sequence and refine every moment.',glyph:'▰',colors:['#1254F4','#00CFFF'],stats:['Video track','Transitions','Color grade']},

    {title:'SOUND DESIGN',eyebrow:'AUDIO MIXER',detail:'Music, voiceover and sound in perfect balance.',glyph:'♫',colors:['#00CFFF','#1254F4'],stats:['Voiceover','Music','Mixing']}

  ],

  'social-media-creatives':[

    {title:'FEED DESIGN',eyebrow:'SOCIAL POSTS',detail:'A consistent, recognizable visual identity.',glyph:'▦',colors:['#07194E','#1254F4','#00CFFF'],stats:['Carousel','Feed post','Creative']},

    {title:'STORY FORMAT',eyebrow:'VERTICAL CONTENT',detail:'Full-screen stories that hold attention.',glyph:'▯',colors:['#1254F4','#00CFFF'],stats:['9:16','Interactive','Engaging']},

    {title:'REELS STUDIO',eyebrow:'SHORT FORM VIDEO',detail:'Motion-first creative built for discovery.',glyph:'▶',colors:['#07194E','#00CFFF'],stats:['Hooks','Motion','Retention']}

  ],

  'content-creation':[

    {title:'YOUR NEXT STORY',eyebrow:'DRAFT EDITOR',detail:'Turn early ideas into purposeful content.',glyph:'✎',colors:['#1254F4','#00CFFF'],stats:['Outline','Draft','Storytelling']},

    {title:'EDITORIAL REVIEW',eyebrow:'CONTENT QUALITY',detail:'Sharpen clarity, voice and structure.',glyph:'✓',colors:['#07194E','#1254F4'],stats:['Tone','Clarity','Proofread']},

    {title:'READY TO PUBLISH',eyebrow:'CONTENT DELIVERY',detail:'Prepared for the right audience and channel.',glyph:'↗',colors:['#1254F4','#00CFFF'],stats:['Website','Social','Campaign']}

  ],

  'web-design':[

    {title:'DESKTOP WEBSITE',eyebrow:'RESPONSIVE DESIGN',detail:'Design experiences that work on large screens.',glyph:'▣',colors:['#1254F4','#00CFFF'],stats:['Desktop','Navigation','Layout']},

    {title:'MOBILE WEBSITE',eyebrow:'RESPONSIVE DESIGN',detail:'Adapt every experience for smaller screens.',glyph:'▯',colors:['#07194E','#00CFFF'],stats:['Mobile','Touch','Responsive']},

    {title:'UI COMPONENTS',eyebrow:'INTERFACE DESIGN',detail:'Reusable sections, buttons and design systems.',glyph:'▦',colors:['#1254F4','#00CFFF'],stats:['Components','UX','Accessibility']}

  ],

  'motion-graphics':[

    {title:'SHAPE ANIMATION',eyebrow:'MOTION COMPOSITION',detail:'Shapes that move with intention.',glyph:'◉',colors:['#1254F4','#00CFFF'],stats:['Scale','Rotate','Position']},

    {title:'KEYFRAME EDITOR',eyebrow:'ANIMATION TIMING',detail:'Control every transition with precision.',glyph:'◆',colors:['#07194E','#1254F4'],stats:['0s','1.5s','3s']},

    {title:'MOTION PREVIEW',eyebrow:'FINAL ANIMATION',detail:'Smooth transitions that make ideas memorable.',glyph:'↝',colors:['#00CFFF','#1254F4'],stats:['Easing','Movement','Loop']}

  ],

  campaigns:[

    {title:'SEARCH CAMPAIGN',eyebrow:'SEARCH CHANNEL',detail:'Reach people who are actively looking.',glyph:'⌕',colors:['#1254F4','#00CFFF'],stats:['Keywords','Intent','Search ads']},

    {title:'SOCIAL CAMPAIGN',eyebrow:'SOCIAL CHANNEL',detail:'Build attention through engaging creative.',glyph:'♡',colors:['#07194E','#1254F4'],stats:['Creative','Audience','Engagement']},

    {title:'VIDEO CAMPAIGN',eyebrow:'VIDEO CHANNEL',detail:'Tell a compelling story through motion.',glyph:'▶',colors:['#1254F4','#00CFFF'],stats:['Story','Video','Awareness']}

  ],

  'creative-strategy':[

    {title:'KNOW YOUR AUDIENCE',eyebrow:'AUDIENCE RESEARCH',detail:'Understand who matters and what they need.',glyph:'◎',colors:['#1254F4','#00CFFF'],stats:['Needs','Motivations','Segments']},

    {title:'FIND THE INSIGHT',eyebrow:'STRATEGIC THINKING',detail:'Translate research into a clear opportunity.',glyph:'✧',colors:['#07194E','#1254F4'],stats:['Research','Positioning','Opportunity']},

    {title:'THE BIG IDEA',eyebrow:'CREATIVE DIRECTION',detail:'One focused concept to guide the work.',glyph:'✦',colors:['#1254F4','#00CFFF'],stats:['Concept','Messaging','Direction']}

  ],

  'digital-marketing':[

    {title:'12.8K',eyebrow:'WEBSITE TRAFFIC',detail:'Grow visibility through relevant channels.',glyph:'↗',colors:['#1254F4','#00CFFF'],stats:['SEO','Visitors','Channels']},

    {title:'320',eyebrow:'LEAD PIPELINE',detail:'Turn visits into valuable enquiries.',glyph:'◎',colors:['#07194E','#1254F4'],stats:['Forms','Calls','Conversions']},

    {title:'+38%',eyebrow:'GROWTH REPORT',detail:'Use data to improve the next decision.',glyph:'▥',colors:['#1254F4','#00CFFF'],stats:['Insights','Optimize','Measure']}

  ],

  'app-development':[

    {title:'APP INTERFACE',eyebrow:'UI DESIGN',detail:'Intuitive mobile experiences made for people.',glyph:'▯',colors:['#1254F4','#00CFFF'],stats:['Screens','Navigation','UI kit']},

    {title:'BUILD IN PROGRESS',eyebrow:'DEVELOPMENT',detail:'Bring the interface to life with code.',glyph:'</>',colors:['#07194E','#1254F4'],stats:['Components','APIs','Testing']},

    {title:'APP IS READY',eyebrow:'DEPLOYMENT',detail:'Prepare your application for release.',glyph:'✓',colors:['#1254F4','#00CFFF'],stats:['Build','QA','Launch']}

  ]

};



function InteractiveTabScene({slug,active}:{slug:string;active:number}) {

  const data=tabScenes[slug] || tabScenes.branding;

  const scene=data[active] || data[0];

  return <div key={`${slug}-${active}`} className="sh-tab-scene" role="tabpanel" id={`sh-panel-${slug}`} aria-label={`${scene.eyebrow} preview`}>

    <div className="sh-tab-stage">

      <span className="sh-tab-eyebrow">{scene.eyebrow}</span>

      <div className={`sh-tab-symbol ${slug==='motion-graphics'?'sh-tab-symbol-motion':''}`} aria-hidden="true">{scene.glyph}</div>

      <strong className="sh-tab-title">{scene.title}</strong>

      <div className="sh-tab-palette" aria-label="Visual palette">{scene.colors.map((color,i)=><span key={`${color}-${i}`} style={{backgroundColor:color}} />)}</div>

      <p className="sh-tab-description">{scene.detail}</p>

    </div>

    <div className="sh-tab-stats">{scene.stats.map((item,i)=><span key={item} style={{animationDelay:`${i*110}ms`}}>{item}</span>)}</div>

  </div>;

}



function AnimatedServicePreview({service}:{service:Service}) {

  const slug:HeroSlug=service.slug;

  const d=heroLabels[slug] || heroLabels.branding;

  const [active,setActive]=useState(0);

  const isApp=slug==='app-development';

  const isVideo=slug==='video-production';

  const isSocial=slug==='social-media-creatives';

  const isContent=slug==='content-creation';

  const isAnalytics=slug==='digital-marketing'||slug==='advertising';

  const isMotion=slug==='motion-graphics';

  const isCampaign=slug==='campaigns'||slug==='creative-strategy';

  return <div className={`sh-custom sh-custom-${slug}`} role="img" aria-label={`${service.title} animated creative preview`}>

    <div className="sh-custom-orb sh-orb-one"/><div className="sh-custom-orb sh-orb-two"/>

    <div className="sh-custom-top"><span className="sh-pulse"/><span>{d.eyebrow}</span><span className="sh-custom-live">● LIVE PREVIEW</span></div>

    <div className="sh-custom-workspace">

      <div className="sh-custom-sidebar"><service.icon size={25}/><span/><span/><span/></div>

      <div className="sh-custom-main">

        <div className="sh-custom-windowbar"><i/><i/><i/><span>solifyhub / {slug}</span></div>

        {active !== 0 ? <InteractiveTabScene slug={slug} active={active}/> : isApp ? <div className="sh-app-scene"><div className="sh-app-phone"><div className="sh-app-notch"/><div className="sh-app-header">Good morning ✦</div><div className="sh-app-feature"><Smartphone size={24}/><b>YOUR APP</b><small>Made for what’s next</small></div><div className="sh-app-tiles"><i/><i/><i/><i/></div><div className="sh-app-nav">⌂　◉　♡　☰</div></div><div className="sh-app-code"><Code2 size={20}/><code>const idea = 'launch';</code><code>build(idea);</code><code>deploy('success');</code><span>✓ BUILD SUCCESSFUL</span></div></div>

        : isVideo ? <div className="sh-video-scene"><div className="sh-video-screen"><div className="sh-video-play"><Play size={26} fill="currentColor"/></div><span>FRAME 001 / STORY IN MOTION</span></div><div className="sh-video-timeline"><div/><div/><div/><div/><div/></div><div className="sh-video-scrubber"/></div>

        : isSocial ? <div className="sh-social-scene"><div className="sh-social-post"><div className="sh-social-account"><Instagram size={15}/> SOLIFYHUB <span>•••</span></div><div className="sh-social-art"><Sparkles size={40}/><strong>CREATE<br/>IMPACT.</strong></div><div className="sh-social-actions"><Heart size={16}/><MessageCircle size={16}/><Share2 size={16}/><span>↗</span></div></div><div className="sh-social-float">♡ +1.2K</div></div>

        : isContent ? <div className="sh-content-scene"><div className="sh-content-toolbar"><Type size={16}/> Content editor <span>● Saved</span></div><strong className="sh-content-type">Stories worth sharing.</strong><div className="sh-content-line"/><div className="sh-content-line short"/><div className="sh-content-line"/><div className="sh-content-cursor"/><div className="sh-content-tag"><PenTool size={14}/> Draft in progress</div></div>

        : isAnalytics ? <div className="sh-analytics-scene"><div className="sh-analytics-header"><span>Campaign performance</span><TrendingUp size={20}/></div><div className="sh-analytics-metrics"><div><small>Reach</small><strong>128.4K</strong></div><div><small>Engagement</small><strong>+42%</strong></div></div><div className="sh-analytics-bars">{[34,52,43,70,57,82,64,95].map((n,i)=><div key={i} style={{height:`${n}%`,animationDelay:`${i*0.12}s`}}/>)}</div><span className="sh-analytics-foot"><Target size={14}/> Optimizing for growth</span></div>

        : isMotion ? <div className="sh-motion-scene"><div className="sh-motion-shape one"/><div className="sh-motion-shape two"/><div className="sh-motion-shape three"/><div className="sh-motion-center"><Zap size={32}/></div><div className="sh-motion-track"><span/><span/><span/><span/></div></div>

        : isCampaign ? <div className="sh-strategy-scene"><div className="sh-strategy-node primary"><Compass size={22}/><strong>{slug==='campaigns'?'BIG IDEA':'STRATEGY'}</strong></div><div className="sh-strategy-links"><i/><i/><i/></div><div className="sh-strategy-nodes"><span><Search size={19}/> Discover</span><span><Megaphone size={19}/> Activate</span><span><BarChart3 size={19}/> Measure</span></div></div>

        : slug==='graphic-design' ? <div className="sh-design-scene"><div className="sh-design-tools"><PenTool size={16}/><Layers size={16}/><ImageIcon size={16}/></div><div className="sh-design-canvas"><div className="sh-design-circle"/><div className="sh-design-square"/><strong>DESIGN<br/>MATTERS.</strong><div className="sh-design-pointer"><MousePointer2 size={22}/></div></div></div>

        : <div className="sh-brand-scene"><div className="sh-brand-card"><div className="sh-brand-mark">S<span>✦</span></div><strong>IDENTITY<br/>WITH IMPACT.</strong><small>CREATED TO STAND OUT</small></div><div className="sh-brand-palette"><span/><span/><span/><span/></div><div className="sh-brand-stamp"><Check size={17}/> Brand ready</div></div>}

      </div>

    </div>

    <div className="sh-custom-footer"><div><small>{d.subline}</small><strong>{d.headline}</strong></div><div className="sh-custom-chips">{d.chips.map((chip,i)=><button type="button" key={chip} aria-pressed={active===i} aria-controls={`sh-panel-${slug}`} onClick={()=>setActive(i)}>{chip}</button>)}</div></div>

  </div>;

}



function ServiceHeroVisual({service}:{service:Service}) {

  if(service.slug === 'web-design') return <WebsiteBuilderPreview/>;

  return <AnimatedServicePreview key={service.slug} service={service}/>;

}



// FAQs are taken from the supplied “FAQs for Website.docx” (5 per service).
const serviceFaqs: Record<string, {q: string; a: string}[]> = {
  "web-design": [
    {
      "q": "What web design services does SOLIFYHUB offer in Visakhapatnam?",
      "a": "SOLIFYHUB provides web design services in Visakhapatnam, including business websites, corporate websites, responsive website design, landing pages, and portfolio websites."
    },
    {
      "q": "Why does my business need a professional website?",
      "a": "A professional website helps customers discover your business, explore your services, and contact you easily. It also builds credibility and gives your business a stronger online presence."
    },
    {
      "q": "Does SOLIFYHUB create mobile-friendly and responsive websites?",
      "a": "Yes, SOLIFYHUB designs responsive websites that adapt to mobile phones, tablets, and desktop screens, providing a consistent and user-friendly browsing experience."
    },
    {
      "q": "How can a well-designed website generate business leads?",
      "a": "A well-designed website uses clear service information, simple navigation, contact forms, and effective calls to action to encourage visitors to enquire about your products or services."
    },
    {
      "q": "Why should I choose SOLIFYHUB for website design in Visakhapatnam?",
      "a": "SOLIFYHUB combines modern website design, responsive layouts, and business-focused user experiences to help businesses create professional websites that reflect their brand and encourage customer enquiries."
    }
  ],
  "branding": [
    {
      "q": "What is branding, and why is it important for a business?",
      "a": "Branding creates a unique identity for your business through logos, colors, messaging, and design. Strong branding helps customers recognize your business, builds trust, and makes your brand stand out from competitors."
    },
    {
      "q": "What branding services does SOLIFYHUB offer in Visakhapatnam?",
      "a": "SOLIFYHUB provides branding services in Visakhapatnam, including logo design, brand identity development, brand guidelines, visual identity, and brand positioning to help businesses create a professional and memorable image."
    },
    {
      "q": "How can professional branding help my business grow?",
      "a": "Professional branding improves business recognition, builds customer confidence, and creates a consistent image across marketing platforms. It helps customers remember your business and understand what makes it different."
    },
    {
      "q": "Does SOLIFYHUB provide logo design and brand identity services?",
      "a": "Yes, SOLIFYHUB creates professional logos and brand identities that reflect your business values. Our branding solutions include visual elements, brand colors, typography, and consistent design guidelines."
    },
    {
      "q": "Why should I choose a branding agency in Visakhapatnam?",
      "a": "A branding agency in Visakhapatnam can help you understand your local audience and create a brand identity that connects with potential customers. SOLIFYHUB combines creativity and business-focused design to build recognizable brands."
    }
  ],
  "digital-marketing": [
    {
      "q": "What digital marketing services does SOLIFYHUB offer in Visakhapatnam?",
      "a": "SOLIFYHUB focuses on digital marketing solutions such as SEO, local SEO, social media marketing, Google Ads, content marketing, and digital campaigns to help businesses improve online visibility and reach potential customers."
    },
    {
      "q": "How can digital marketing help my business get more customers?",
      "a": "Digital marketing helps businesses reach people searching for relevant products or services online. SEO, paid advertising, social media, and useful content can increase website traffic, generate enquiries, and support customer acquisition."
    },
    {
      "q": "What is the difference between SEO and Google Ads?",
      "a": "SEO improves a website's visibility in organic search results, while Google Ads allows businesses to display paid advertisements for relevant searches. SEO supports long-term visibility, while Google Ads can attract targeted traffic more quickly."
    },
    {
      "q": "Why is local SEO important for businesses in Visakhapatnam?",
      "a": "Local SEO helps businesses improve their visibility in location-based Google searches and Google Maps. It makes it easier for nearby customers to discover business information, services, contact details, and directions."
    },
    {
      "q": "How long does digital marketing take to show results?",
      "a": "Digital marketing results depend on your goals, competition, budget, and strategy. Paid advertising may generate traffic soon after launch, while SEO typically requires several months of consistent optimization to produce meaningful organic improvements."
    }
  ],
  "campaigns": [
    {
      "q": "What is a marketing campaign?",
      "a": "A marketing campaign is a planned set of promotional activities designed to achieve a business goal, such as increasing brand awareness, launching a product, generating enquiries, or attracting customers."
    },
    {
      "q": "How can marketing campaigns help my business grow?",
      "a": "Marketing campaigns help businesses reach their target audience with consistent messages across selected platforms. A well-planned campaign can increase visibility, encourage customer engagement, and support business goals."
    },
    {
      "q": "What types of marketing campaigns can businesses run?",
      "a": "Businesses can run brand awareness campaigns, product launch campaigns, seasonal promotions, social media campaigns, advertising campaigns, and lead generation campaigns based on their objectives."
    },
    {
      "q": "Why is campaign planning important for digital marketing?",
      "a": "Campaign planning helps businesses define goals, identify their target audience, choose suitable marketing channels, and create consistent messages. It also makes campaign performance easier to evaluate."
    },
    {
      "q": "How does SOLIFYHUB develop creative marketing campaigns?",
      "a": "SOLIFYHUB focuses on understanding business objectives, identifying audience needs, developing creative concepts, and planning consistent communication across relevant marketing channels."
    }
  ],
  "content-creation": [
    {
      "q": "What is content creation in digital marketing?",
      "a": "Content creation involves developing useful and engaging text, images, videos, and other materials for websites, social media, and marketing campaigns. It helps businesses communicate with their target audience."
    },
    {
      "q": "How can content creation help my business grow online?",
      "a": "Quality content helps businesses explain services, answer customer questions, improve online visibility, and build trust. Consistent, relevant content can attract potential customers and encourage enquiries."
    },
    {
      "q": "What types of content can businesses create for marketing?",
      "a": "Businesses can create website content, blogs, social media posts, promotional videos, product descriptions, and advertising content to connect with customers across digital platforms."
    },
    {
      "q": "Why is SEO-friendly content important for websites?",
      "a": "SEO-friendly content helps search engines understand your website and makes information easier for users to find. Relevant keywords, clear headings, and useful answers can support organic search visibility."
    },
    {
      "q": "How does SOLIFYHUB approach content creation for businesses?",
      "a": "SOLIFYHUB focuses on clear messaging, creative ideas, audience relevance, and consistent brand communication to help businesses create content that supports their marketing goals."
    }
  ],
  "creative-strategy": [
    {
      "q": "What is creative strategy in marketing?",
      "a": "Creative strategy is the process of planning how a business communicates its message through visuals, content, advertising, and campaigns. It connects creative ideas with business goals and audience needs."
    },
    {
      "q": "Why is creative strategy important for business growth?",
      "a": "Creative strategy helps businesses deliver consistent messages, connect with the right audience, and make marketing activities more purposeful. It supports stronger brand communication and better campaign planning."
    },
    {
      "q": "What creative strategy services does SOLIFYHUB provide?",
      "a": "SOLIFYHUB provides creative campaign concepts, brand communication strategy, audience and market insights, and content and advertising direction for businesses in Visakhapatnam."
    },
    {
      "q": "What is the difference between creative strategy and digital marketing?",
      "a": "Creative strategy focuses on developing the message, ideas, and visual direction, while digital marketing focuses on promoting those messages through online channels such as search engines and social media."
    },
    {
      "q": "How does SOLIFYHUB create a creative strategy for a business?",
      "a": "SOLIFYHUB begins by understanding business objectives, target audiences, and brand positioning. We then develop creative concepts and communication directions that align with the business's marketing goals."
    }
  ],
  "advertising": [
    {
      "q": "What are advertising services, and how do they help businesses?",
      "a": "Advertising services help businesses promote their products or services to potential customers. Effective advertising increases brand awareness, attracts interested audiences, and creates opportunities for enquiries and sales."
    },
    {
      "q": "What advertising services does SOLIFYHUB offer in Visakhapatnam?",
      "a": "SOLIFYHUB develops creative advertising concepts, promotional designs, campaign messages, and digital advertising content to help businesses communicate their offerings effectively."
    },
    {
      "q": "How can digital advertising help my business get more customers?",
      "a": "Digital advertising helps businesses reach relevant audiences through online platforms. With the right message, creative content, and targeting strategy, businesses can generate enquiries and attract potential customers."
    },
    {
      "q": "What is the difference between advertising and branding?",
      "a": "Branding creates your business identity and reputation, while advertising promotes your products or services. Both work together to build recognition, attract customers, and support business growth."
    },
    {
      "q": "Why should businesses invest in professional advertising?",
      "a": "Professional advertising helps businesses communicate clearly, reach potential customers, and promote products effectively. A well-planned advertising campaign can improve visibility and support sales goals."
    }
  ],
  "graphic-design": [
    {
      "q": "What graphic design services does SOLIFYHUB provide?",
      "a": "SOLIFYHUB provides graphic design services in Visakhapatnam, including posters, flyers, brochures, business cards, advertising graphics, and digital marketing materials designed to communicate your business message effectively."
    },
    {
      "q": "Why is graphic design important for business marketing?",
      "a": "Professional graphic design makes your marketing materials attractive, improves brand recognition, and helps customers understand your products or services. Consistent designs also create a professional business image."
    },
    {
      "q": "Does SOLIFYHUB design brochures, posters, and business cards?",
      "a": "Yes, SOLIFYHUB creates customized brochures, posters, flyers, business cards, and promotional materials based on your brand identity and marketing requirements."
    },
    {
      "q": "How can graphic design improve my brand identity?",
      "a": "Graphic design maintains consistent colors, typography, and visual styles across marketing materials. This helps customers recognize your brand and builds a stronger professional identity."
    },
    {
      "q": "Where can I find professional graphic design services in Visakhapatnam?",
      "a": "SOLIFYHUB offers professional graphic design services in Visakhapatnam for businesses looking for creative posters, branding materials, advertising graphics, and digital designs."
    }
  ],
  "social-media-creatives": [
    {
      "q": "What are social media creatives?",
      "a": "Social media creatives are visual designs used on platforms such as Instagram, Facebook, and LinkedIn. They include promotional posts, carousels, advertising graphics, and branded content that help businesses communicate with their audience."
    },
    {
      "q": "What social media creative services does SOLIFYHUB provide?",
      "a": "SOLIFYHUB designs Instagram posts, Facebook creatives, carousel posts, promotional graphics, campaign creatives, and branded social media content for businesses in Visakhapatnam."
    },
    {
      "q": "How do social media creatives improve engagement?",
      "a": "Attractive social media creatives capture attention and make content easier to understand. Relevant visuals and clear messaging can encourage likes, shares, comments, and customer interactions."
    },
    {
      "q": "Why does my business need professional social media post designs?",
      "a": "Professional post designs maintain brand consistency, improve visual presentation, and help businesses communicate offers, updates, and services effectively across social media platforms."
    },
    {
      "q": "Does SOLIFYHUB create customized Instagram and Facebook posts?",
      "a": "Yes, SOLIFYHUB creates customized Instagram and Facebook designs based on your brand colors, business goals, audience preferences, and promotional requirements."
    }
  ],
  "video-production": [
    {
      "q": "What video production services does SOLIFYHUB offer?",
      "a": "SOLIFYHUB provides video production services in Visakhapatnam, including corporate videos, promotional videos, product videos, advertising videos, and social media reels."
    },
    {
      "q": "Why is video marketing important for business growth?",
      "a": "Video marketing helps businesses explain their products, showcase services, and connect with customers visually. Engaging videos can increase brand awareness and encourage viewers to learn more about your business."
    },
    {
      "q": "Does SOLIFYHUB create promotional videos and Instagram reels?",
      "a": "Yes, SOLIFYHUB creates promotional videos, Instagram reels, social media videos, and advertising content designed to capture attention and communicate your brand message."
    },
    {
      "q": "How can corporate videos benefit my business?",
      "a": "Corporate videos help businesses introduce their company, explain services, showcase achievements, and build trust with potential customers through professional visual storytelling."
    },
    {
      "q": "Where can I get professional video production services in Visakhapatnam?",
      "a": "SOLIFYHUB provides professional video production services in Visakhapatnam for businesses that need promotional videos, corporate films, product videos, and engaging social media content."
    }
  ],
  
  "motion-graphics": [
    {
      "q": "What are motion graphics in digital marketing?",
      "a": "Motion graphics are animated visual elements that combine text, illustrations, shapes, and movement. They help businesses explain ideas, promote services, and make marketing content more engaging."
    },
    {
      "q": "How can motion graphics help my business?",
      "a": "Motion graphics make complex information easier to understand and help promotional content capture attention. Businesses can use them to explain products, highlight offers, and communicate brand messages."
    },
    {
      "q": "What is the difference between motion graphics and video editing?",
      "a": "Motion graphics focus on animated text, shapes, and visual elements, while video editing involves arranging and improving recorded footage. Both techniques can work together to create engaging marketing videos."
    },
    {
      "q": "Where can businesses use motion graphics?",
      "a": "Businesses can use motion graphics in social media advertisements, promotional videos, product explainers, website animations, presentations, and digital marketing campaigns."
    },
    {
      "q": "Why should businesses use professional motion graphics services?",
      "a": "Professional motion graphics help businesses present information creatively, maintain visual consistency, and create memorable promotional content that communicates messages clearly."
    }
  ],
  "app-development": [
    {
      "q": "What app development services does SOLIFYHUB offer in Visakhapatnam?",
      "a": "SOLIFYHUB provides app development solutions in Visakhapatnam for businesses looking to build Android and iOS mobile applications. We focus on creating user-friendly, responsive, and business-focused mobile apps that improve customer experiences and support digital growth."
    },
    {
      "q": "Why does my business need a mobile application?",
      "a": "A mobile application helps businesses connect directly with customers, improve service accessibility, and provide a convenient user experience. Business apps can support online bookings, product browsing, customer communication, and other digital services."
    },
    {
      "q": "Does SOLIFYHUB develop Android and iOS mobile applications?",
      "a": "Yes, SOLIFYHUB develops Android and iOS mobile applications based on business requirements. We focus on intuitive design, smooth navigation, essential functionality, and user-friendly experiences to help businesses connect with customers through mobile devices."
    },
    {
      "q": "How much does mobile app development cost in Visakhapatnam?",
      "a": "Mobile app development costs depend on the application's features, design complexity, platform requirements, and integrations. Simple business apps generally cost less than advanced applications with payment gateways, user accounts, and custom functionality. Contact SOLIFYHUB for a quotation based on your project requirements."
    },
    {
      "q": "How long does it take to develop a mobile application?",
      "a": "Mobile app development timelines depend on the app's complexity, features, design, and testing requirements. A simple application may take a few weeks, while advanced apps can require several months. SOLIFYHUB can provide an estimated development timeline after reviewing your business requirements."
    }
  ]
};

// Canonical display order. Database display_number must not change the website numbering.
const SERVICE_DISPLAY_NUMBERS: Record<string, string> = {
  'web-design': '01',
  'branding': '02',
  'digital-marketing': '03',
  'campaigns': '04',
  'content-creation': '05',
  'creative-strategy': '06',
  'advertising': '07',
  'graphic-design': '08',
  'social-media-creatives': '09',
  'video-production': '10',
  'motion-graphics': '11',
  'app-development': '12',
};

export default function ServiceDetail({slug}:{slug:string}) {

  const fallback = services.find(s=>s.slug===slug) || services[0];

  const [service,setService] = useState<Service>(fallback);

  const [openFaq,setOpenFaq] = useState<number|null>(0);

  const details = serviceContent[slug] || serviceContent['branding'];



  useEffect(()=>{

    let active=true;

    setService(fallback); setOpenFaq(0);

    supabase.from('services').select('title,slug,tagline,description,hero_image,seo_title,seo_description')

      .eq('slug',slug).eq('publish_status','published').maybeSingle().then(({data,error})=>{

        if(active && !error && data) setService({...fallback,title:data.title||fallback.title,tagline:data.tagline||fallback.tagline,text:data.description||fallback.text,number:SERVICE_DISPLAY_NUMBERS[slug] || fallback.number,image:data.hero_image||fallback.image,seoTitle:data.seo_title||fallback.seoTitle,seoDescription:data.seo_description||fallback.seoDescription});

      });

    return ()=>{active=false};

  },[slug]);



  // Keep one canonical URL for the currently selected service route.
  useEffect(() => {
    const canonicalUrl = `https://solifyhub.com/services/${encodeURIComponent(slug)}`;
    const links = document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"]');
    let canonical = links[0];

    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }

    canonical.href = canonicalUrl;
    links.forEach((link, index) => {
      if (index > 0) link.remove();
    });
  }, [slug]);

  useSEO({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${slug}`,
    keywords: `${service.title.toLowerCase()} agency Visakhapatnam, ${service.title.toLowerCase()} Vizag, ${service.title.toLowerCase()} Andhra Pradesh, digital marketing services`,
    image: service.image,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.seoDescription,
      provider: {
        '@type': 'Organization',
        name: 'SOLIFYHUB',
        url: 'https://solifyhub.com',
      },
      areaServed: {
        '@type': 'City',
        name: 'Visakhapatnam',
      },
      url: `https://solifyhub.com/services/${slug}`,
    },
  });

  const faq = serviceFaqs[slug] || [];  return <main className="sh-service-page"><style>{servicePageStyles}</style><style>{uniformNavyHoverStyles}</style>

    <section className="sh-hero"><div className="container-wide sh-hero-grid"><div className="sh-hero-copy"><p className="eyebrow">SERVICE / {SERVICE_DISPLAY_NUMBERS[slug] || service.number}</p><h1>{service.title}</h1><p className="sh-hero-tagline">{service.tagline}</p></div><ServiceHeroVisual service={service}/></div></section>

    <section className="section-pad bg-white"><div className="container-wide sh-intro-grid"><div><p className="eyebrow mb-5">INTRODUCTION</p><h2 className="section-title">{details.heading}</h2><p className="body-copy mt-6 text-lg">{service.text}</p><p className="body-copy mt-4">{details.intro}</p></div><div><p className="eyebrow mb-5">WHAT WE OFFER</p><div className="sh-offer-grid">{([...service.items.slice(0,3), fourthOffer[slug] || "Additional services"]).map((item,i)=><article className="sh-offer-card" key={item}><span className="sh-card-number">0{i+1}</span><service.icon size={26} className="sh-card-icon"/><h3>{item}</h3><p>{details.offerDescriptions[i]||'Purposeful solutions tailored to your business needs.'}</p><ArrowUpRight className="sh-card-arrow" size={18}/></article>)}</div></div></div></section>

    <section className="section-pad sh-benefits"><div className="container-wide"><p className="eyebrow mb-5">THE BENEFITS</p><h2 className="section-title">Made for meaningful results.</h2><div className="sh-benefit-grid">{details.benefitTitles.map((title,i)=><article className="sh-benefit-card" key={title}><CheckCircle2 size={26}/><h3>{title}</h3><p>{details.benefitDescriptions[i]}</p></article>)}</div></div></section>

    <section className="section-pad sh-process"><div className="container-wide"><p className="eyebrow !text-[#00CFFF] mb-5">OUR PROCESS</p><h2 className="section-title !text-white">Understand. Make.<br/><span className="!text-[#00CFFF]">Improve.</span></h2><div className="sh-process-grid">{details.processTitles.map((title,i)=><article className="sh-process-step" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{details.processDescriptions[i]}</p></article>)}</div></div></section>

    <section className="section-pad bg-white"><div className="container-wide sh-faq-grid"><div><p className="eyebrow mb-5">FAQs</p><h2 className="section-title">A little more clarity.</h2></div><div className="sh-faq-list">{faq.map((item,i)=><div className={`sh-faq ${openFaq===i?'sh-faq-open':''}`} key={item.q}><button type="button" aria-expanded={openFaq===i} aria-controls={`sh-faq-${slug}-${i}`} onClick={()=>setOpenFaq(openFaq===i?null:i)}><span>{item.q}</span><ChevronDown size={20}/></button><div id={`sh-faq-${slug}-${i}`} className="sh-faq-answer" hidden={openFaq!==i}><p>{item.a}</p></div></div>)}</div></div></section>

    <CTA/>

  </main>;

}
