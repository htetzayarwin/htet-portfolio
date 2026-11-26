
/* =====================================================
   HTET.DEV — JAVASCRIPT V2
   Features:
   1. Mobile Navigation
   2. Current Year
   3. Scroll Reveal
   4. Active Navigation
   5. EN / JP Language Switch
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // =================================================
    // 1. MOBILE NAVIGATION
    // =================================================

    const menuToggle = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    function closeMobileMenu() {
        if (!menuToggle || !navbar) return;

        navbar.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    if (menuToggle && navbar) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navbar.classList.toggle("open");

            menuToggle.classList.toggle("open", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

        // Close menu after selecting a navigation link
        navLinks.forEach(link => {
            link.addEventListener("click", closeMobileMenu);
        });

        // Close menu when clicking outside
        document.addEventListener("click", event => {

            const clickedInsideMenu =
                navbar.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInsideMenu) {
                closeMobileMenu();
            }

        });

        // Close menu when switching to desktop width
        window.addEventListener("resize", () => {

            if (window.innerWidth > 850) {
                closeMobileMenu();
            }

        });

    }


    // =================================================
    // 2. CURRENT YEAR
    // =================================================

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // =================================================
    // 3. SCROLL REVEAL ANIMATION
    // =================================================

    const revealElements = document.querySelectorAll(".reveal");

    // Respect reduced-motion accessibility preference
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    } else {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    }


    // =================================================
    // 4. ACTIVE NAVIGATION
    // =================================================

    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const currentId = entry.target.id;

                        navLinks.forEach(link => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") === `#${currentId}`
                            ) {
                                link.classList.add("active");
                            }

                        });

                    }

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });

    }


    // =================================================
    // 5. LANGUAGE SWITCHER
    // =================================================

    const languageSwitch = document.getElementById("language-switch");

    // Load saved language safely
    let currentLanguage = "en";

    try {
        const savedLanguage = localStorage.getItem("htet-language");

        if (savedLanguage === "en" || savedLanguage === "ja") {
            currentLanguage = savedLanguage;
        }

    } catch (error) {
        console.warn("Language storage is unavailable.");
    }


    // =================================================
    // TRANSLATION DICTIONARY
    // =================================================

    const translations = {

        // =============================================
        // ENGLISH
        // =============================================

        en: {

            // Navigation
            home: "Home",
            about: "About",
            skills: "Skills",
            topology_nav: "Topology",
            projects: "Projects",
            certifications: "Certifications",
            journal: "Lab Journal",
            contact: "Contact",

            // Hero
            hero_intro: "HELLO, WORLD! I'M",

            hero_title:
                'Network & Cloud <span>Infrastructure Engineer</span>',

            hero_description:
                "A Networking & Security student at Nihon Kogakuin College, interested in building secure, reliable, and scalable IT infrastructure.",

            hero_projects: "View Projects",
            hero_contact: "Contact Me",

            // Terminal
            terminal_education: "Networking & Security Student",
            terminal_interest_1: "Cisco Networking",
            terminal_interest_2: "Linux Administration",
            terminal_interest_3: "Network Security",
            terminal_interest_4: "Cloud Infrastructure",

            // Topology
            topology_label: "01 / NETWORK ARCHITECTURE",
            topology_title: 'Network <span>Topology</span>',
            topology_description:
                "Example of an enterprise network architecture.",

            demo_label: "LAB / EXAMPLE",

            topology_note:
                "Illustrative topology for learning purposes.",

            // Monitoring
            monitor_label: "02 / INFRASTRUCTURE",

            monitor_title:
                'Infrastructure <span>Monitoring</span>',

            monitor_description:
                "A visual demonstration of infrastructure monitoring concepts.",

            demo_only: "DEMO ONLY · NOT LIVE DATA",

            monitor_network: "Network",
            monitor_servers: "Servers",
            monitor_security: "Security",
            monitor_cloud: "Cloud",

            traffic_title: "Network Traffic",

            traffic_caption:
                "Illustrative traffic pattern — no live measurements.",

            // About
            about_label: "03 / ABOUT ME",
            about_title: 'Who is <span>HTET?</span>',
            about_description: "My background, education, and direction.",
            about_subtitle: "Networking & Security Student",

            about_paragraph_1:
                "I am a Networking and Security student at Nihon Kogakuin College in Japan, with a background in Computer Science from Myanmar.",

            about_paragraph_2:
                "Before coming to Japan, I studied Computer Science at a Computer University in Myanmar, where I developed foundational knowledge of programming and computer technologies.",

            about_paragraph_3:
                "Currently, I am expanding my technical knowledge in networking, information security, Linux administration, and cloud infrastructure through academic studies and hands-on practice.",

            about_paragraph_4:
                "My goal is to become a Network and Cloud Infrastructure Engineer, specializing in building, managing, and securing reliable IT infrastructure.",

            // Personal Information
            info_name: "NAME",
            info_education: "EDUCATION",
            info_school: "Nihon Kogakuin College",
            info_field: "FIELD",
            info_field_value: "Networking & Security",
            info_location: "LOCATION",
            info_location_value: "Japan",
            info_career: "CAREER GOAL",
            info_career_value: "Network & Cloud Infrastructure Engineer",

            // Skills
            skills_label: "04 / TECHNICAL SKILLS",
            skills_title: 'My <span>Technical Stack</span>',
            skills_description:
                "Technologies and concepts I am studying and practicing.",

            skill_networking_title: "Networking",
            skill_networking_description:
                "Learning network fundamentals, routing, switching, and network design.",

            skill_security_title: "Network Security",
            skill_security_description:
                "Studying network protection and fundamental security technologies.",

            skill_linux_title: "Linux Administration",
            skill_linux_description:
                "Practicing Linux command-line operations and system administration.",

            skill_cloud_title: "Cloud Infrastructure",
            skill_cloud_description:
                "Building foundational knowledge of AWS cloud services and architecture.",

            skill_programming_title: "Programming & Web",
            skill_programming_description:
                "Learning programming fundamentals and developing web projects.",

            skill_tools_title: "Development Tools",
            skill_tools_description:
                "Tools used for technical practice, development, and version control.",

            // Projects
            projects_label: "05 / PROJECTS",
            projects_title: 'Learning Through <span>Practice</span>',
            projects_description:
                "Practical exercises and personal projects.",

            project_network_title: "Cisco Network Lab",
            project_network_description:
                "Practicing router and switch configurations, IPv4 addressing, subnetting, VLANs, and connectivity troubleshooting.",

            project_linux_title: "Linux Administration Lab",
            project_linux_description:
                "Practicing Linux commands, file management, permissions, system services, and basic system administration.",

            project_cloud_title: "AWS Cloud Learning",
            project_cloud_description:
                "Studying cloud computing concepts, AWS core services, and infrastructure architecture fundamentals.",

            status_learning: "Learning / Practice",
            status_progress: "In Progress",

            // Certifications
            certifications_label: "06 / CERTIFICATION ROADMAP",
            certifications_title: 'My Learning <span>Goals</span>',

            certifications_description:
                "Certifications I am preparing for or planning to pursue.",

            cert_ccna_description:
                "Networking fundamentals, IP connectivity, security, and automation.",

            cert_aws_description:
                "Cloud architecture, AWS services, and infrastructure design.",

            cert_fe_title:
                "Fundamental Information Technology Engineer (FE)",

            cert_fe_description:
                "Core IT knowledge, algorithms, programming, databases, networking, and information security.",

            status_preparing: "Preparing",
            status_planned: "Planned",

            // Lab Journal
            journal_label: "07 / LAB JOURNAL",
            journal_title: 'Learning <span>Log</span>',
            journal_description:
                "A record of my technical learning journey.",

            journal_subnet_title: "IPv4 Addressing & Subnetting",
            journal_subnet_description:
                "Practicing network IDs, broadcast addresses, host ranges, and subnet calculations.",

            journal_cisco_title: "Router & Switch Configuration",
            journal_cisco_description:
                "Practicing Cisco CLI, VLAN configuration, routing, and network connectivity testing.",

            journal_linux_title: "Linux System Administration",
            journal_linux_description:
                "Learning command-line operations, file permissions, and system services.",

            // Contact
            contact_label: "08 / CONTACT",
            contact_title: 'Let\'s Build Something <span>Reliable.</span>',

            contact_description:
                "I am interested in learning, sharing knowledge, and connecting with people in networking, security, and cloud infrastructure.",

            contact_button: "Get In Touch",
            github_button: "GitHub Profile",

            // Footer
            footer_design: "Designed & Built by HTET (テッ)",
            footer_rights: "All rights reserved."

        },


        // =============================================
        // JAPANESE
        // =============================================

        ja: {

            // Navigation
            home: "ホーム",
            about: "自己紹介",
            skills: "スキル",
            topology_nav: "ネットワーク構成",
            projects: "プロジェクト",
            certifications: "資格",
            journal: "学習記録",
            contact: "お問い合わせ",

            // Hero
            hero_intro: "こんにちは！私は",

            hero_title:
                'ネットワーク・クラウド <span>インフラエンジニア</span>を目指しています',

            hero_description:
                "日本工学院でネットワークとセキュリティを学んでいます。安全で信頼性が高く、拡張性のあるITインフラの構築に関心があります。",

            hero_projects: "プロジェクトを見る",
            hero_contact: "お問い合わせ",

            // Terminal
            terminal_education: "ネットワーク・セキュリティ専攻の学生",
            terminal_interest_1: "Ciscoネットワーク",
            terminal_interest_2: "Linuxシステム管理",
            terminal_interest_3: "ネットワークセキュリティ",
            terminal_interest_4: "クラウドインフラ",

            // Topology
            topology_label: "01 / ネットワークアーキテクチャ",
            topology_title: 'ネットワーク<span>構成図</span>',

            topology_description:
                "企業ネットワークアーキテクチャの構成例です。",

            demo_label: "実習 / 構成例",

            topology_note:
                "学習を目的としたネットワーク構成のイメージです。",

            // Monitoring
            monitor_label: "02 / インフラストラクチャ",

            monitor_title:
                'インフラ<span>監視</span>',

            monitor_description:
                "インフラ監視の概念を視覚的に紹介するデモです。",

            demo_only: "デモのみ・リアルタイムデータではありません",

            monitor_network: "ネットワーク",
            monitor_servers: "サーバー",
            monitor_security: "セキュリティ",
            monitor_cloud: "クラウド",

            traffic_title: "ネットワークトラフィック",

            traffic_caption:
                "表示用のサンプルグラフです。実際の測定データではありません。",

            // About
            about_label: "03 / 自己紹介",
            about_title: 'HTETとは<span>？</span>',
            about_description: "これまでの経歴、学歴、そして目標。",
            about_subtitle: "ネットワーク・セキュリティ専攻",

            about_paragraph_1:
                "私はミャンマーでコンピューターサイエンスを学んだ経験を持ち、現在は日本工学院でネットワークとセキュリティを学んでいます。",

            about_paragraph_2:
                "来日する前、ミャンマーのコンピューター大学でコンピューターサイエンスを学び、プログラミングやコンピューター技術の基礎知識を身につけました。",

            about_paragraph_3:
                "現在は、学校での学習と実践を通して、ネットワーク、情報セキュリティ、Linuxシステム管理、クラウドインフラに関する技術知識を深めています。",

            about_paragraph_4:
                "私の目標は、信頼性の高いITインフラの構築、管理、セキュリティを専門とするネットワーク・クラウドインフラエンジニアになることです。",

            // Personal Information
            info_name: "名前",
            info_education: "学校",
            info_school: "日本工学院",
            info_field: "専攻",
            info_field_value: "ネットワーク・セキュリティ",
            info_location: "所在地",
            info_location_value: "日本",
            info_career: "将来の目標",
            info_career_value: "ネットワーク・クラウドインフラエンジニア",

            // Skills
            skills_label: "04 / 技術スキル",
            skills_title: '私の<span>技術スタック</span>',
            skills_description:
                "現在学習・実践している技術と知識です。",

            skill_networking_title: "ネットワーク",
            skill_networking_description:
                "ネットワークの基礎、ルーティング、スイッチング、ネットワーク設計を学習しています。",

            skill_security_title: "ネットワークセキュリティ",
            skill_security_description:
                "ネットワーク保護と基本的なセキュリティ技術を学習しています。",

            skill_linux_title: "Linuxシステム管理",
            skill_linux_description:
                "Linuxコマンドライン操作とシステム管理を実践しています。",

            skill_cloud_title: "クラウドインフラ",
            skill_cloud_description:
                "AWSクラウドサービスとアーキテクチャの基礎知識を身につけています。",

            skill_programming_title: "プログラミング・Web",
            skill_programming_description:
                "プログラミングの基礎を学び、Webプロジェクトを開発しています。",

            skill_tools_title: "開発ツール",
            skill_tools_description:
                "技術演習、開発、バージョン管理に使用するツールです。",

            // Projects
            projects_label: "05 / プロジェクト",
            projects_title: '<span>実践</span>を通じた学習',
            projects_description: "実践的な演習と個人プロジェクト。",

            project_network_title: "Ciscoネットワーク実習",
            project_network_description:
                "ルーターとスイッチの設定、IPv4アドレス、サブネット、VLAN、接続トラブルシューティングを実践しています。",

            project_linux_title: "Linuxシステム管理実習",
            project_linux_description:
                "Linuxコマンド、ファイル管理、アクセス権限、システムサービス、基本的なシステム管理を実践しています。",

            project_cloud_title: "AWSクラウド学習",
            project_cloud_description:
                "クラウドコンピューティング、AWSの主要サービス、インフラアーキテクチャの基礎を学習しています。",

            status_learning: "学習・実践中",
            status_progress: "進行中",

            // Certifications
            certifications_label: "06 / 資格取得計画",
            certifications_title: '私の学習<span>目標</span>',

            certifications_description:
                "現在準備中、または今後取得を目指している資格です。",

            cert_ccna_description:
                "ネットワークの基礎、IP接続、セキュリティ、自動化。",

            cert_aws_description:
                "クラウドアーキテクチャ、AWSサービス、インフラ設計。",

            cert_fe_title: "基本情報技術者試験 (FE)",

            cert_fe_description:
                "ITの基礎知識、アルゴリズム、プログラミング、データベース、ネットワーク、情報セキュリティ。",

            status_preparing: "学習中",
            status_planned: "取得予定",

            // Lab Journal
            journal_label: "07 / 実習記録",
            journal_title: '学習<span>記録</span>',
            journal_description: "技術学習の記録です。",

            journal_subnet_title: "IPv4アドレスとサブネット",
            journal_subnet_description:
                "ネットワークアドレス、ブロードキャストアドレス、ホスト範囲、サブネット計算を練習しています。",

            journal_cisco_title: "ルーター・スイッチ設定",
            journal_cisco_description:
                "Cisco CLI、VLAN設定、ルーティング、ネットワーク接続テストを実践しています。",

            journal_linux_title: "Linuxシステム管理",
            journal_linux_description:
                "コマンドライン操作、ファイル権限、システムサービスを学習しています。",

            // Contact
            contact_label: "08 / お問い合わせ",

            contact_title:
                '信頼できるインフラを<span>構築しよう。</span>',

            contact_description:
                "学習や知識の共有に関心があり、ネットワーク、セキュリティ、クラウドインフラに関わる方々との交流を大切にしています。",

            contact_button: "お問い合わせ",
            github_button: "GitHubプロフィール",

            // Footer
            footer_design: "HTET (テッ) によるデザイン・制作",
            footer_rights: "All rights reserved."

        }

    };


    // =================================================
    // 6. APPLY LANGUAGE
    // =================================================

    function applyLanguage(language) {

        // Use English if the requested language is unavailable
        if (!translations[language]) {
            language = "en";
        }

        currentLanguage = language;

        // Update HTML language attribute
        document.documentElement.lang = currentLanguage;

        // Update translated elements
        document.querySelectorAll("[data-i18n]").forEach(element => {

            const key = element.dataset.i18n;

            const translatedText =
                translations[currentLanguage][key];

            if (translatedText !== undefined) {

                // Dictionary values are authored translations.
                // innerHTML preserves highlighted heading spans.
                element.innerHTML = translatedText;

            } else {

                console.warn(`Missing translation: ${key}`);

            }

        });

        // Update language button
        if (languageSwitch) {

            languageSwitch.textContent =
                currentLanguage === "en" ? "JP" : "EN";

            languageSwitch.setAttribute(
                "aria-label",
                currentLanguage === "en"
                    ? "Switch to Japanese"
                    : "Switch to English"
            );

        }

        // Save selected language
        try {
            localStorage.setItem("htet-language", currentLanguage);
        } catch (error) {
            console.warn("Could not save language preference.");
        }

    }


    // =================================================
    // 7. LANGUAGE BUTTON EVENT
    // =================================================

    if (languageSwitch) {

        languageSwitch.addEventListener("click", () => {

            const nextLanguage =
                currentLanguage === "en" ? "ja" : "en";

            applyLanguage(nextLanguage);

        });

    }


    // =================================================
    // 8. INITIALIZE WEBSITE
    // =================================================

    applyLanguage(currentLanguage);

});
