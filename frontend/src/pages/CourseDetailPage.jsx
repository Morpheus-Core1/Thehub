import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CertificateModal } from '../components/CertificateModal';
import { generateCertificatePdf } from '../utils/certificatePdf';
import {
  Clock,
  User,
  BookOpen,
  CheckCircle2,
  PlayCircle,
  FileText,
  Award,
  ArrowLeft,
  Lock,
  ChevronDown,
  Sparkles,
  Zap,
  Download,
  Check,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

export const CourseDetailPage = ({
  course,
  user,
  onEnroll,
  onTriggerAuth
}) => {
  const navigate = useNavigate();
  const [activeLesson, setActiveLesson] = useState(null);
  const [isExamOpen, setIsExamOpen] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [examPassed, setExamPassed] = useState(false);
  const [examResult, setExamResult] = useState(null);
  const [activeCertificate, setActiveCertificate] = useState(null);

  if (!course) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-lg font-bold text-blue-950">Course Not Found</h2>
        <button
          onClick={() => navigate('/courses')}
          className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold"
        >
          Return to Courses
        </button>
      </div>
    );
  }

  const isEnrolled = user?.enrolledCourses?.includes(course.id);
  const existingCert = user?.certificates?.find(c => c.courseId === course.id);

  const handleEnrollClick = () => {
    if (!user) {
      onTriggerAuth(course);
    } else {
      onEnroll(course.id);
    }
  };

  // Standardized Course Exam Questions based on course category
  const examQuestions = [
    {
      id: 'q1',
      question: `What is the core workplace standard when executing projects in ${course.category}?`,
      options: [
        'Following documented best practices and verifying results with data',
        'Finishing as fast as possible without validation',
        'Relying solely on assumptions without peer review',
        'Skipping documentation and quality checks'
      ],
      correctIndex: 0
    },
    {
      id: 'q2',
      question: `When applying ${course.skillsGained?.[0] || 'core techniques'} in the Rwandan economy, which outcome is most critical?`,
      options: [
        'High cost proprietary tool dependency',
        'Practical value creation, usability, and measurable problem-solving',
        'Theoretical knowledge without practical artifact delivery',
        'Complex non-reproducible manual workflows'
      ],
      correctIndex: 1
    },
    {
      id: 'q3',
      question: 'How do you verify capability and competence on The Hub platform?',
      options: [
        'Just clicking next on video lessons',
        'Producing verifiable practical artifacts and passing competency rubrics',
        'Paying a fee for automated badge issuance',
        'Accumulating watch time without assessment'
      ],
      correctIndex: 1
    }
  ];

  const handleAnswerSelect = (qId, optionIdx) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitExam = () => {
    let correctCount = 0;
    examQuestions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });

    const scorePct = Math.round((correctCount / examQuestions.length) * 100);
    const passed = scorePct >= 66; // 2 out of 3

    const certData = {
      id: `HUB-RWA-${Date.now().toString().slice(-6)}`,
      courseId: course.id,
      courseTitle: course.title,
      category: course.category,
      learnerName: user?.fullName || 'Kezia Umutoni',
      score: scorePct,
      issuedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      instructorName: course.instructor_name || 'Academic Lead',
      level: course.difficulty === 'Advanced' ? 'Level 3: Specialist' : 'Level 2: Practitioner'
    };

    setExamResult({ score: scorePct, passed, correctCount });

    if (passed) {
      setExamPassed(true);
      setActiveCertificate(certData);

      // Persist to user's profile and localStorage
      if (user) {
        const updatedCerts = [...(user.certificates || []).filter(c => c.courseId !== course.id), certData];
        const updatedUser = {
          ...user,
          certificates: updatedCerts,
          completedCourses: [...new Set([...(user.completedCourses || []), course.id])]
        };
        localStorage.setItem('hub_user', JSON.stringify(updatedUser));
      }
    }
  };

  const handleInstantDownloadPdf = (cert) => {
    generateCertificatePdf({
      learnerName: cert.learnerName || user?.fullName || 'Kezia Umutoni',
      courseTitle: cert.courseTitle || course.title,
      category: cert.category || course.category,
      date: cert.issuedDate || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      certificateId: cert.id || `HUB-RWA-${Date.now().toString().slice(-6)}`,
      instructorName: course.instructor_name || 'Academic Course Lead',
      level: cert.level || 'Level 2: Practitioner'
    });
  };

  return (
    <div className="space-y-8 pb-16">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-950 transition-colors font-mono"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO CATALOG</span>
      </button>

      {/* Hero Header Card */}
      <div className="bg-slate-200/70 border border-slate-300 rounded-3xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start shadow-sm backdrop-blur-sm">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 text-xs font-mono font-bold rounded-lg bg-blue-900 text-white shadow-sm">
              {course.category}
            </span>
            <span className="text-xs text-slate-600 font-mono font-bold">
              · {course.difficulty} Level · {course.estimated_hours} Hours Estimated
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 tracking-tight">
            {course.title}
          </h1>

          <p className="text-sm text-slate-700 leading-relaxed">
            {course.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-600">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-blue-800" />
              <span>Instructor: <strong className="text-blue-950">{course.instructor_name}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-red-600" />
              <span>Language: <strong className="text-blue-950">{course.language}</strong></span>
            </div>
          </div>

          {/* Action CTA & Certificate Status */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={handleEnrollClick}
              className={`px-6 py-3 rounded-2xl font-extrabold text-xs shadow-lg transition-all flex items-center gap-2 active:scale-95 ${
                isEnrolled
                  ? 'bg-blue-900 hover:bg-blue-800 text-white shadow-blue-950/20'
                  : 'bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-red-600/30'
              }`}
            >
              {isEnrolled ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Enrolled — Continue Learning</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>{user ? 'Enroll in Course (Free)' : 'Select & Enroll (Auth Gate)'}</span>
                </>
              )}
            </button>

            {/* If user already completed or earned certificate */}
            {(existingCert || examPassed) && (
              <button
                onClick={() => setActiveCertificate(existingCert || activeCertificate)}
                className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-2xl font-extrabold text-xs shadow-md transition-all flex items-center gap-2 active:scale-95"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>View & Download Certificate (PDF)</span>
              </button>
            )}
          </div>
        </div>

        {/* Thumbnail Card in Light Gray */}
        <div className="bg-slate-100 border border-slate-300 rounded-2xl overflow-hidden p-3 space-y-3 shadow-sm">
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="w-full h-44 object-cover rounded-xl"
          />

          <div className="p-2 space-y-2">
            <div className="text-xs font-extrabold text-blue-950 uppercase font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-700" />
              <span>Skills You Master</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {course.skillsGained?.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-800 bg-slate-200 rounded-md border border-slate-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modules Syllabus */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-blue-950 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-800" />
          <span>Course Modules & Curriculum</span>
        </h2>

        <div className="space-y-3">
          {course.modules?.map((mod, idx) => (
            <div key={mod.id || idx} className="bg-slate-200/60 border border-slate-300 rounded-2xl p-5 space-y-3 shadow-sm">
              <h3 className="text-sm font-extrabold text-blue-950 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-blue-900 text-white text-xs font-mono flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <span>{mod.title}</span>
              </h3>

              <div className="divide-y divide-slate-300/80 pt-1">
                {mod.lessons?.map((lesson, lIdx) => (
                  <div
                    key={lesson.id || lIdx}
                    onClick={() => {
                      if (!isEnrolled) {
                        handleEnrollClick();
                      } else {
                        setActiveLesson(lesson);
                      }
                    }}
                    className="py-3 flex items-center justify-between text-xs text-slate-800 hover:text-blue-900 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      {lesson.type === 'exercise' || lesson.type === 'project' ? (
                        <Award className="w-4 h-4 text-red-600 shrink-0" />
                      ) : (
                        <FileText className="w-4 h-4 text-slate-400 group-hover:text-blue-700 shrink-0" />
                      )}
                      <span className="font-semibold group-hover:text-blue-800 transition-colors">
                        {lesson.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                      <span>{lesson.duration}</span>
                      {!isEnrolled && <Lock className="w-3 h-3 text-slate-400" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* End-of-Course Final Assessment & Certificate Issuance Card */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl border border-blue-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/30 border border-red-500/40 text-red-300 font-mono text-[11px] font-bold uppercase">
              <Award className="w-3.5 h-3.5 text-red-400" />
              <span>Official Verification Gate</span>
            </div>
            <h3 className="text-xl font-extrabold tracking-tight">
              Course Final Assessment & Certificate
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pass the comprehensive competency evaluation (70%+ passing benchmark) to receive your official <strong>Certificate of Verified Competence</strong> with immediate PDF download.
            </p>
          </div>

          <div>
            {existingCert || examPassed ? (
              <div className="space-y-2 text-right sm:text-left">
                <div className="text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5 justify-end sm:justify-start">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Assessment Passed & Verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveCertificate(existingCert || activeCertificate)}
                    className="px-5 py-2.5 bg-white text-blue-950 hover:bg-slate-100 font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                  >
                    View Certificate
                  </button>
                  <button
                    onClick={() => handleInstantDownloadPdf(existingCert || activeCertificate)}
                    className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  if (!isEnrolled) {
                    handleEnrollClick();
                  } else {
                    setIsExamOpen(true);
                  }
                }}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-red-950/40 transition-all flex items-center gap-2 active:scale-95"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>Take Final Assessment & Get Certificate</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Lesson Modal */}
      {activeLesson && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-200 border border-slate-300 rounded-3xl w-full max-w-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-300 pb-3">
              <div>
                <span className="text-[10px] font-mono text-red-600 font-bold uppercase">Active Lesson</span>
                <h3 className="text-base font-extrabold text-blue-950 mt-0.5">{activeLesson.title}</h3>
              </div>
              <button
                onClick={() => setActiveLesson(null)}
                className="text-slate-500 hover:text-slate-900 font-mono text-sm"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-slate-700 leading-relaxed space-y-3 py-2">
              <p>
                Welcome to <strong>{activeLesson.title}</strong>. This module covers core conceptual mechanics, practical examples, and exercises designed for the Rwandan digital and economic context.
              </p>
              <div className="p-4 bg-slate-100 rounded-xl border border-slate-300 font-mono text-[11px] text-blue-950">
                // Lesson Progression Rubric<br/>
                [✓] Read key concept breakdown<br/>
                [✓] Review real-world example<br/>
                [ ] Complete end-of-module assessment & record in Skill Passport
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveLesson(null)}
                className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl shadow-sm"
              >
                Mark as Reviewed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* End-of-Course Final Assessment Modal */}
      {isExamOpen && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-100 border border-slate-300 rounded-3xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in my-8">
            <div className="flex items-start justify-between border-b border-slate-300 pb-3">
              <div>
                <span className="text-[10px] font-mono text-blue-900 font-bold uppercase">
                  Final Competency Evaluation
                </span>
                <h3 className="text-base font-extrabold text-blue-950 mt-0.5">
                  {course.title} — Certification Exam
                </h3>
              </div>
              <button
                onClick={() => setIsExamOpen(false)}
                className="text-slate-400 hover:text-slate-800 font-mono text-base"
              >
                ✕
              </button>
            </div>

            {examResult ? (
              <div className="space-y-4 py-3">
                <div
                  className={`p-5 rounded-2xl border text-xs space-y-2 ${
                    examResult.passed
                      ? 'bg-emerald-100 border-emerald-300 text-emerald-950'
                      : 'bg-rose-100 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-extrabold text-sm">
                    {examResult.passed ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Congratulations! You Passed with {examResult.score}%!</span>
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-5 h-5 text-rose-600" />
                        <span>Score: {examResult.score}%. Passing score is 66% (2/3). Please review and retry!</span>
                      </>
                    )}
                  </div>
                  <p className="leading-relaxed">
                    {examResult.passed
                      ? 'Your competence has been verified. Your official certificate is generated and logged into your Skill Passport.'
                      : 'Review the lessons and modules, then re-take the assessment to earn your certificate.'}
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  {!examResult.passed ? (
                    <button
                      onClick={() => {
                        setExamResult(null);
                        setSelectedAnswers({});
                      }}
                      className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl"
                    >
                      Try Again
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsExamOpen(false);
                        setActiveCertificate(activeCertificate);
                      }}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 text-white font-bold text-xs rounded-xl shadow-md"
                    >
                      View & Download PDF Certificate
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-5 text-xs">
                {examQuestions.map((q, idx) => (
                  <div key={q.id} className="bg-slate-200/60 p-4 rounded-2xl border border-slate-300 space-y-3">
                    <div className="font-extrabold text-blue-950 text-xs">
                      Question {idx + 1} of {examQuestions.length}: {q.question}
                    </div>

                    <div className="space-y-1.5">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = selectedAnswers[q.id] === oIdx;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleAnswerSelect(q.id, oIdx)}
                            className={`w-full text-left p-3 rounded-xl transition-all border text-xs flex items-center justify-between ${
                              isSelected
                                ? 'bg-blue-900 text-white border-blue-800 font-bold shadow-sm'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsExamOpen(false)}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={Object.keys(selectedAnswers).length < examQuestions.length}
                    onClick={handleSubmitExam}
                    className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white font-extrabold text-xs rounded-xl shadow-md disabled:opacity-50 transition-all active:scale-95"
                  >
                    Submit & Evaluate Exam
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Official Certificate Modal with Instant PDF Export */}
      <CertificateModal
        isOpen={Boolean(activeCertificate)}
        onClose={() => setActiveCertificate(null)}
        certificate={activeCertificate}
      />
    </div>
  );
};
