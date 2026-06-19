"use client";

import {
  createContext,
  useContext,
  useState,
  type ComponentPropsWithoutRef,
  type FormEvent,
  type ReactNode,
} from "react";
import { Send } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/sections/contact/contact-fields";
import {
  RainbowButton,
  type RainbowButtonProps,
} from "@/components/ui/rainbow-button";

const caseOptions = [
  "Imam idejo, ki jo želim spraviti v delujoč sistem",
  "Imam proces, ki vzame preveč časa",
  "Želim avtomatizirati del poslovanja",
  "Želim interno AI aplikacijo ali orodje",
  "Ne vem še točno, kaj potrebujem",
  "Drugo",
];

const timelineOptions = [
  "Čim prej",
  "V naslednjih 30 dneh",
  "V naslednjih 3 mesecih",
  "Samo raziskujem",
];

const ContactModalContext = createContext<(() => void) | null>(null);
const web3FormsEndpoint = "https://api.web3forms.com/submit";

type SubmitStatus =
  | {
      type: "error";
      message: string;
    }
  | {
      type: "success";
      message: string;
    };

type Web3FormsResponse = {
  success?: boolean;
  message?: string;
};

function getFormValue(formData: FormData, name: string) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

function ContactForm() {
  const [status, setStatus] = useState<SubmitStatus | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const botcheck = getFormValue(formData, "botcheck");

    if (botcheck) {
      return;
    }

    const name = getFormValue(formData, "name");
    const email = getFormValue(formData, "email");
    const message = getFormValue(formData, "message");

    if (!name || !email || !message) {
      setStatus({
        type: "error",
        message: "Izpolnite ime, e-pošto in sporočilo.",
      });
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus({
        type: "error",
        message:
          "Nekaj je šlo narobe. Poskusi znova ali piši na contact@luciand.co.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch(web3FormsEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "Novo povpraševanje — LUCI&CO",
          from_name: name,
          name,
          company: getFormValue(formData, "company"),
          email,
          phone: getFormValue(formData, "phone"),
          message,
          case_type: getFormValue(formData, "case_type"),
          start_time: getFormValue(formData, "start_time"),
          botcheck,
        }),
      });
      const result = (await response.json()) as Web3FormsResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Web3Forms request failed");
      }

      setStatus({
        type: "success",
        message: "Prejeto. Oglasimo se ti z naslednjim korakom.",
      });
    } catch {
      setStatus({
        type: "error",
        message:
          "Nekaj je šlo narobe. Poskusi znova ali piši na contact@luciand.co.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 max-h-[calc(92svh-11rem)] overflow-y-auto pb-6 pr-1 sm:pb-0"
    >
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          id="contact-name"
          label="Ime in priimek"
          name="name"
          autoComplete="name"
          required
        />
        <TextField
          id="contact-company"
          label="Podjetje"
          name="company"
          autoComplete="organization"
        />
        <TextField
          id="contact-email"
          label="E-pošta"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <TextField
          id="contact-phone"
          label="Telefon"
          name="phone"
          type="tel"
          autoComplete="tel"
        />
      </div>

      <div className="mt-4">
        <TextAreaField
          id="contact-message"
          label="Kaj imate v mislih?"
          name="message"
          placeholder="Na kratko opišite idejo, problem, proces ali del podjetja, kjer izgubljate čas. Ni treba, da je tehnično jasno. Lahko dodate tudi, kaj bi rad izboljšali, zgradili ali avtomatizirali z AI-jem."
          required
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <SelectField
          id="contact-case-type"
          label="Kaj najbolje opiše vaš primer?"
          name="case_type"
          options={caseOptions}
        />
        <SelectField
          id="contact-timeline"
          label="Kdaj bi želeli začeti?"
          name="start_time"
          options={timelineOptions}
        />
      </div>

      {status ? (
        <p className="mt-5 font-sans text-sm font-medium leading-[1.45] text-black/48">
          {status.type === "error" &&
          status.message.includes("contact@luciand.co") ? (
            <>
              Nekaj je šlo narobe. Poskusi znova ali piši na{" "}
              <a
                href="mailto:contact@luciand.co"
                className="text-black underline underline-offset-4"
              >
                contact@luciand.co
              </a>
              .
            </>
          ) : (
            status.message
          )}
        </p>
      ) : null}

      <div className="mt-3 flex flex-col sm:flex-row sm:items-center">
        <RainbowButton
          type="submit"
          size="lg"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="font-sans text-sm font-medium [--speed:5s]"
        >
          Pošlji
          <Send className="size-4" aria-hidden="true" />
        </RainbowButton>
      </div>
    </form>
  );
}

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <ContactModalContext.Provider value={() => setOpen(true)}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <div className="p-5 sm:p-6">
            <DialogHeader className="pr-8">
              <DialogTitle>Kontaktiraj nas</DialogTitle>
              <DialogDescription>
                Na kratko povejte, kaj imate v mislih. Ideja, problem, proces
                ali samo občutek, da nekaj v podjetju ne teče tako, kot bi
                moralo.
              </DialogDescription>
            </DialogHeader>
            <ContactForm />
          </div>
        </DialogContent>
      </Dialog>
    </ContactModalContext.Provider>
  );
}

export function ContactModalButton({
  children,
  onClick,
  type = "button",
  ...props
}: RainbowButtonProps) {
  const openContactModal = useContext(ContactModalContext);

  return (
    <RainbowButton
      type={type}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          openContactModal?.();
        }
      }}
      {...props}
    >
      {children}
    </RainbowButton>
  );
}

export function ContactModalTrigger({
  children,
  onClick,
  type = "button",
  ...props
}: ComponentPropsWithoutRef<"button">) {
  const openContactModal = useContext(ContactModalContext);

  return (
    <button
      type={type}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          openContactModal?.();
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}
